import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/common/button/button"

export function ButtonLoading() {
  return (
    <Button variant="ghost" disabled>
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      Loading
    </Button>
  )
}
