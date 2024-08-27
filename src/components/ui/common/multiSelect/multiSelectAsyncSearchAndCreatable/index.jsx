'use client';
import React from 'react';
import { MultipleSelector } from '@/components/ui/common/multiSelect';
// import { InlineCode } from '@/components/ui/inline-code';

const mockSearch = async (value, options) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const res = options.filter((option) => option.value.includes(value));
      resolve(res);
    }, 1000);
  });
};

const MultipleSelectorWithAsyncSearchAndCreatable = ({ options }) => {
  const [isTriggered, setIsTriggered] = React.useState(false);

  return (
    <div className="flex w-full flex-col gap-5 px-10">
      <p>
        {/* Is request been triggered? <InlineCode>{String(isTriggered)}</InlineCode> */}
        Is request been triggered? {String(isTriggered)}

      </p>
      <MultipleSelector
        onSearch={async (value) => {
          setIsTriggered(true);
          const res = await mockSearch(value, options);
          setIsTriggered(false);
          return res;
        }}
        defaultOptions={[]}
        creatable
        placeholder="trying to search 'a' to get more options..."
        loadingIndicator={
          <p className="py-2 text-center text-lg leading-10 text-muted-foreground">loading...</p>
        }
        emptyIndicator={
          <p className="w-full text-center text-lg leading-10 text-muted-foreground">
            no results found.
          </p>
        }
      />
    </div>
  );
};

export default MultipleSelectorWithAsyncSearchAndCreatable;
