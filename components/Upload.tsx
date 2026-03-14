import { useCallback, useRef, useState } from "react";
import {
  PROGRESS_INTERVAL_MS,
  PROGRESS_STEP,
  REDIRECT_DELAY_MS,
} from "../lib/constant";

export type UploadProps = {
  isSignedIn: boolean;
  onComplete: (base64Data: string) => void;
};

export function Upload({ isSignedIn, onComplete }: UploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [progress, setProgress] = useState(0);
  const [busy, setBusy] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const dragDepthRef = useRef(0);

  const clearProgressInterval = useCallback(() => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const processFile = useCallback(
    (file: File) => {
      if (!isSignedIn || busy) return;

      setBusy(true);
      setProgress(0);
      clearProgressInterval();

      const reader = new FileReader();
      reader.onload = () => {
        const base64Data = reader.result as string;
        intervalRef.current = setInterval(() => {
          setProgress((prev) => {
            const next = Math.min(100, prev + PROGRESS_STEP);
            if (next >= 100) {
              clearProgressInterval();
              window.setTimeout(() => {
                onComplete(base64Data);
                setBusy(false);
                setProgress(0);
              }, REDIRECT_DELAY_MS);
            }
            return next;
          });
        }, PROGRESS_INTERVAL_MS);
      };
      reader.onerror = () => {
        clearProgressInterval();
        setBusy(false);
        setProgress(0);
      };
      reader.readAsDataURL(file);
    },
    [isSignedIn, busy, onComplete, clearProgressInterval]
  );

  const onInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isSignedIn) {
        e.target.value = "";
        return;
      }
      const files = e.target.files;
      if (files?.length) processFile(files[0]);
      e.target.value = "";
    },
    [isSignedIn, processFile]
  );

  const onDragEnter = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (!isSignedIn) return;
      dragDepthRef.current += 1;
      setIsDragging(true);
    },
    [isSignedIn]
  );

  const onDragOver = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (!isSignedIn) return;
      setIsDragging(true);
    },
    [isSignedIn]
  );

  const onDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragDepthRef.current -= 1;
    if (dragDepthRef.current <= 0) {
      dragDepthRef.current = 0;
      setIsDragging(false);
    }
  }, []);

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      dragDepthRef.current = 0;
      setIsDragging(false);
      if (!isSignedIn || busy) return;
      const file = e.dataTransfer.files?.[0];
      if (file) processFile(file);
    },
    [isSignedIn, busy, processFile]
  );

  const signedOut = !isSignedIn;

  return (
    <div className="w-full max-w-xl">
      <label
        className={[
          "relative flex min-h-[200px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed px-6 py-10 transition-colors",
          signedOut
            ? "cursor-not-allowed border-zinc-300 bg-zinc-100 opacity-70 dark:border-zinc-600 dark:bg-zinc-900/50"
            : isDragging
              ? "border-emerald-500 bg-emerald-500/10 shadow-lg shadow-emerald-500/10 dark:border-emerald-400 dark:bg-emerald-500/15"
              : "border-zinc-300 bg-zinc-50 hover:border-zinc-400 dark:border-zinc-600 dark:bg-zinc-900/40 dark:hover:border-zinc-500",
          busy ? "pointer-events-none opacity-90" : "",
        ].join(" ")}
        onDragEnter={onDragEnter}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        <input
          type="file"
          className="sr-only"
          accept="image/*,.pdf"
          disabled={signedOut || busy}
          onChange={onInputChange}
          aria-label="Upload floor plan file"
        />
        {signedOut ? (
          <p className="text-center text-sm font-medium text-zinc-600 dark:text-zinc-400">
            Sign in to upload a floor plan
          </p>
        ) : (
          <>
            <p className="text-center text-sm font-medium text-zinc-800 dark:text-zinc-200">
              {isDragging
                ? "Drop file here"
                : "Drag and drop a floor plan, or click to browse"}
            </p>
            <p className="mt-2 text-center text-xs text-zinc-500">
              Images or PDF — processed as Base64 after upload
            </p>
            {busy && (
              <div
                className="mt-6 w-full max-w-xs"
                role="progressbar"
                aria-valuenow={progress}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <div className="h-2 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-700">
                  <div
                    className="h-full rounded-full bg-emerald-500 transition-[width] duration-100"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="mt-2 text-center text-xs text-zinc-500">
                  {progress}%
                </p>
              </div>
            )}
          </>
        )}
      </label>
    </div>
  );
}

export default Upload;
