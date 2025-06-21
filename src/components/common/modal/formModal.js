'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

export default function ReusableModal({
                                        open,
                                        onClose,
                                        title,
                                        description,
                                        children,
                                        footer,
                                        contentClassName = '',
                                      }) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className={cn(
          "w-full p-6",
          contentClassName && contentClassName.trim().length > 0
            ? contentClassName
            : "!max-w-6xl !w-[90vw]"
        )}
      >
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle>{title}</DialogTitle>
              {description && (
                <DialogDescription className="text-sm text-muted-foreground">
                  {description}
                </DialogDescription>
              )}
            </div>
          </div>
        </DialogHeader>

        <div className="py-4 max-h-[80vh] overflow-y-auto pr-2">{children}</div>

        {footer && <DialogFooter>{footer}</DialogFooter>}
      </DialogContent>
    </Dialog>
  );
}
