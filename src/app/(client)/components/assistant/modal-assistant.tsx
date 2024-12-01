'use client';
import { Dialog, DialogContent } from '@/libs/shadcn-ui/components/dialog';
import { useHotkeys } from 'react-hotkeys-hook';
import Assistant from '.';
import { useAssistantStore } from './assistant-store';
const ModalAssistant = () => {
  const { isOpen, setOpen } = useAssistantStore();
  useHotkeys('ctrl+i', (evt) => {
    evt.preventDefault();
    setOpen();
  });
  return (
    <Dialog open={isOpen} onOpenChange={setOpen as any}>
      <DialogContent className="overflow-hidden sm:rounded-none p-0 max-w-full w-full h-full md:max-w-[740px] md:h-[480px] m-0 select-text focus-visible:outline-none focus-visible:ring-0">
        <Assistant />
      </DialogContent>
    </Dialog>
  );
};

export default ModalAssistant;