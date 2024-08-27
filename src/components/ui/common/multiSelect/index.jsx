'use client';

import { Command as CommandPrimitive, useCommandState } from 'cmdk';
import { X } from 'lucide-react';
import React, { forwardRef, useEffect, useRef, useState, useCallback, useImperativeHandle, useMemo } from 'react';

import { Badge } from '@/components/ui/common/badge/badge';
import { Command, CommandGroup, CommandItem, CommandList } from '@/components/ui/common/command/command';
import { cn } from '@/lib/utils';

function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

function transToGroupOption(options, groupBy) {
  if (options.length === 0) return {};
  if (!groupBy) return { '': options };

  const groupOption = {};
  options.forEach(option => {
    const key = option[groupBy] || '';
    if (!groupOption[key]) groupOption[key] = [];
    groupOption[key].push(option);
  });
  return groupOption;
}

function removePickedOption(groupOption, picked) {
  const cloneOption = JSON.parse(JSON.stringify(groupOption));

  for (const [key, value] of Object.entries(cloneOption)) {
    cloneOption[key] = value.filter(val => !picked.find(p => p.value === val.value));
  }
  return cloneOption;
}

function isOptionsExist(groupOption, targetOption) {
  for (const [, value] of Object.entries(groupOption)) {
    if (value.some(option => targetOption.find(p => p.value === option.value))) {
      return true;
    }
  }
  return false;
}

const CommandEmpty = forwardRef((props, forwardedRef) => {
  const render = useCommandState(state => state.filtered.count === 0);

  if (!render) return null;

  return (
    <div
      ref={forwardedRef}
      className={cn('py-6 text-center text-sm', props.className)}
      cmdk-empty=""
      role="presentation"
      {...props}
    />
  );
});

CommandEmpty.displayName = 'CommandEmpty';

const MultipleSelector = forwardRef(({
  value,
  onChange,
  placeholder,
  defaultOptions = [],
  options: arrayOptions,
  delay,
  onSearch,
  onSearchSync,
  loadingIndicator,
  emptyIndicator,
  maxSelected = Number.MAX_SAFE_INTEGER,
  onMaxSelected,
  hidePlaceholderWhenSelected,
  disabled,
  groupBy,
  className,
  badgeClassName,
  selectFirstItem = true,
  creatable = false,
  triggerSearchOnFocus = false,
  commandProps,
  inputProps,
  hideClearAllButton = false,
}, ref) => {
  const inputRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [onScrollbar, setOnScrollbar] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dropdownRef = useRef(null);

  const [selected, setSelected] = useState(value || []);
  const [options, setOptions] = useState(transToGroupOption(defaultOptions, groupBy));
  const [inputValue, setInputValue] = useState('');
  const debouncedSearchTerm = useDebounce(inputValue, delay || 500);

  useImperativeHandle(ref, () => ({
    selectedValue: [...selected],
    input: inputRef.current,
    focus: () => inputRef.current?.focus(),
  }), [selected]);

  const handleClickOutside = useCallback((event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target) &&
        inputRef.current && !inputRef.current.contains(event.target)) {
      setOpen(false);
    }
  }, []);

  const handleUnselect = useCallback((option) => {
    const newOptions = selected.filter(s => s.value !== option.value);
    setSelected(newOptions);
    onChange?.(newOptions);
  }, [onChange, selected]);

  const handleKeyDown = useCallback((e) => {
    const input = inputRef.current;
    if (input) {
      if (e.key === 'Delete' || e.key === 'Backspace') {
        if (input.value === '' && selected.length > 0) {
          const lastSelectOption = selected[selected.length - 1];
          if (!lastSelectOption.fixed) {
            handleUnselect(selected[selected.length - 1]);
          }
        }
      }
      if (e.key === 'Escape') {
        input.blur();
      }
    }
  }, [handleUnselect, selected]);

  useEffect(() => {
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchend', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchend', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchend', handleClickOutside);
    };
  }, [open, handleClickOutside]);

  useEffect(() => {
    if (value) {
      setSelected(value);
    }
  }, [value]);

  useEffect(() => {
    if (!arrayOptions || onSearch) return;
    const newOption = transToGroupOption(arrayOptions || [], groupBy);
    if (JSON.stringify(newOption) !== JSON.stringify(options)) {
      setOptions(newOption);
    }
  }, [defaultOptions, arrayOptions, groupBy, onSearch, options]);

  useEffect(() => {
    const doSearchSync = () => {
      const res = onSearchSync?.(debouncedSearchTerm);
      setOptions(transToGroupOption(res || [], groupBy));
    };

    const exec = async () => {
      if (!onSearchSync || !open) return;

      if (triggerSearchOnFocus) {
        doSearchSync();
      }

      if (debouncedSearchTerm) {
        doSearchSync();
      }
    };

    void exec();
  }, [debouncedSearchTerm, groupBy, open, triggerSearchOnFocus]);

  useEffect(() => {
    const doSearch = async () => {
      setIsLoading(true);
      const res = await onSearch?.(debouncedSearchTerm);
      setOptions(transToGroupOption(res || [], groupBy));
      setIsLoading(false);
    };

    const exec = async () => {
      if (!onSearch || !open) return;

      if (triggerSearchOnFocus) {
        await doSearch();
      }

      if (debouncedSearchTerm) {
        await doSearch();
      }
    };

    void exec();
  }, [debouncedSearchTerm, groupBy, open, triggerSearchOnFocus]);

  const CreatableItem = () => {
    if (!creatable) return null;
    if (isOptionsExist(options, [{ value: inputValue, label: inputValue }]) ||
        selected.find(s => s.value === inputValue)) {
      return null;
    }

    const Item = (
      <CommandItem
        value={inputValue}
        className="cursor-pointer"
        onMouseDown={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        onSelect={(value) => {
          if (selected.length >= maxSelected) {
            onMaxSelected?.(selected.length);
            return;
          }
          setInputValue('');
          const newOptions = [...selected, { value, label: value }];
          setSelected(newOptions);
          onChange?.(newOptions);
        }}
      >
        {`Create "${inputValue}"`}
      </CommandItem>
    );

    if (!onSearch && inputValue.length > 0) return Item;

    if (onSearch && debouncedSearchTerm.length > 0 && !isLoading) return Item;

    return null;
  };

  const EmptyItem = useCallback(() => {
    if (!emptyIndicator) return null;

    if (onSearch && !creatable && Object.keys(options).length === 0) {
      return (
        <CommandItem value="-" disabled>
          {emptyIndicator}
        </CommandItem>
      );
    }

    return <CommandEmpty>{emptyIndicator}</CommandEmpty>;
  }, [creatable, emptyIndicator, onSearch, options]);

  const selectables = useMemo(() => removePickedOption(options, selected), [options, selected]);

  const commandFilter = useCallback(() => {
    if (commandProps?.filter) return commandProps.filter;

    if (creatable) {
      return (value, search) => value.toLowerCase().includes(search.toLowerCase()) ? 1 : -1;
    }

    return undefined;
  }, [creatable, commandProps?.filter]);

  return (
    <Command
      ref={dropdownRef}
      {...commandProps}
      onKeyDown={(e) => {
        handleKeyDown(e);
        commandProps?.onKeyDown?.(e);
      }}
      className={cn('h-auto overflow-visible bg-transparent', commandProps?.className)}
      shouldFilter={
        commandProps?.shouldFilter !== undefined ? commandProps.shouldFilter : !onSearch
      }
      filter={commandFilter()}
    >
      <div
        className={cn(
          'min-h-10 rounded-md border border-input text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2',
          {
            'px-3 py-2': selected.length > 0 || (inputValue && !hidePlaceholderWhenSelected),
            'px-3 py-2': !open && selected.length === 0 && !inputValue && !hidePlaceholderWhenSelected,
            'px-3 py-0': open,
          },
          className
        )}
      >
        <div className="flex items-center gap-2">
          {selected.length > 0 && (
            <div className="flex flex-wrap gap-1 py-1">
              {selected.map((option) => (
                <Badge
                  key={option.value}
                  className={badgeClassName}
                  onClick={() => !option.fixed && handleUnselect(option)}
                >
                  {option.label}
                  {!option.fixed && <X className="ml-1 h-3 w-3 cursor-pointer" />}
                </Badge>
              ))}
            </div>
          )}
          <input
            ref={inputRef}
            type="text"
            placeholder={selected.length > 0 ? '' : placeholder}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onFocus={() => setOpen(true)}
            onBlur={() => setOpen(false)}
            disabled={disabled}
            {...inputProps}
          />
        </div>
      </div>
      <CommandList className="overflow-auto">
        {isLoading && loadingIndicator}
        {CreatableItem()}
        {EmptyItem()}
        {Object.entries(selectables).map(([group, options]) => (
          <CommandGroup key={group} heading={group}>
            {options.map((option) => (
              <CommandItem
                key={option.value}
                value={option.value}
                onMouseDown={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                onSelect={(value) => {
                  if (selected.length >= maxSelected) {
                    onMaxSelected?.(selected.length);
                    return;
                  }
                  const newOptions = [...selected, option];
                  setSelected(newOptions);
                  onChange?.(newOptions);
                  setInputValue('');
                }}
              >
                {option.label}
              </CommandItem>
            ))}
          </CommandGroup>
        ))}
      </CommandList>
    </Command>
  );
});

MultipleSelector.displayName = 'MultipleSelector';

export { MultipleSelector };
