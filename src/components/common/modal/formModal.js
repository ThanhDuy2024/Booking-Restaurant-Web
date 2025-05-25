'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { ReactNode } from 'react';

export default function ReusableModal({
                                        open,
                                        onClose,
                                        title,
                                        description,
                                        children,
                                        footer,
                                      }) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
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
            <Button variant="ghost" size="icon" onClick={() => onClose(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>
        </DialogHeader>

        <div className="py-4">{children}</div>

        {footer && <DialogFooter>{footer}</DialogFooter>}
      </DialogContent>
    </Dialog>
  );
}


// import ReusableModal from '@/components/ui/ReusableModal';
//
// <ReusableModal
//   open={isOpen}
//   onClose={setIsOpen}
//   title="Tạo danh mục"
//   description="Điền thông tin vào biểu mẫu bên dưới"
//   footer={
//     <Button type="submit" form="category-form">Lưu</Button>
//   }
// >
//   <form id="category-form" onSubmit={handleSubmit}>
//     {/* Các trường nhập ở đây */}
//   </form>
// </ReusableModal>
//Bạn chỉ cần thay children bằng form create/update cụ thể, và control open từ component cha.
// 📦 Nếu bạn muốn modal auto reset form khi đóng hoặc thêm loading overlay, mình có thể mở rộng thêm!