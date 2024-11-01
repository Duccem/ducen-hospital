'use client';
import { Button } from '@/libs/shadcn-ui/components/button';
import { UploadCloud } from 'lucide-react';
import { forwardRef, useEffect, useRef } from 'react';

interface ImagePickerProps {
  value: string;
  onChange: (value: string) => void;
  onSelectFile: (file: File) => void;
}
const ImagePicker = forwardRef<HTMLInputElement, ImagePickerProps>(
  ({ onChange, value, onSelectFile }, ref) => {
    const inputFileRef = useRef<HTMLInputElement>(null);
    const openFilePicker = () => {
      inputFileRef.current?.click();
    };
    const handleChange = (e: any) => {
      const file = e.target.files[0];
      if (file) {
        onChange(URL.createObjectURL(file));
        onSelectFile(file);
      }
    };
    useEffect(() => {
      inputFileRef.current?.addEventListener('change', handleChange);
      return () => {
        inputFileRef.current?.removeEventListener('change', handleChange);
      };
    }, []);
  
    return (
      <div className="flex gap-3 items-center mb-6">
        {value !== '' && (
          <div className="w-[100px] h-[100px] aspect-video my-3 border border-dashed p-2 border-slate-400 rounded-lg flex justify-center items-center overflow-hidden">
            <img
              src={value}
              alt="course-image"
              className="w-full  object-contain rounded-lg"
            />
          </div>
        )}
        <Button type='button' className="bg-muted text-foreground gap-1 text-sm hover:bg-foreground hover:text-background" onClick={openFilePicker}>
          <UploadCloud className=""></UploadCloud>
          Upload new image
        </Button>
        <input ref={inputFileRef} type="file" className="hidden " />
      </div>
    );
  }
);
ImagePicker.displayName = 'ImagePicker';

export default ImagePicker;
