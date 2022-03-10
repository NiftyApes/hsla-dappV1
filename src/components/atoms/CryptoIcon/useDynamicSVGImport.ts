import React, { useEffect, useState } from 'react';

export interface DynamicSVGImportOptions {
  onCompleted?: (
    name: string,
    SvgIcon: React.FC<React.SVGProps<SVGSVGElement>> | undefined,
  ) => void;
  onError?: React.ReactEventHandler<SVGSVGElement>;
}

export default function useDynamicSVGImport(name: string, options: DynamicSVGImportOptions = {}) {
  const [iconURL, setIconURL] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error] = useState<Error>();

  const { onCompleted, onError } = options;

  useEffect(() => {
    setLoading(true);
    const importIcon = async (): Promise<void> => {
      try {
        const url = (await import(`./svgs/${name}.svg`)).default;
        setIconURL(url);
        onCompleted?.(name, url);
      } catch (err: any) {
        onError?.(err);
      } finally {
        setLoading(false);
      }
    };
    importIcon();
  }, [name, onCompleted, onError]);

  return { error, loading, iconURL };
}
