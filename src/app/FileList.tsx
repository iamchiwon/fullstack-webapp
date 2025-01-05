import Storage from "@/libs/storage";
import { ImageItem } from "@/shared/types/ImageItem";
import { fileSizeFormatter } from "@/utils/formatter";
import { useEffect, useState } from "react";
import { ReloadButton } from "@/components/ReloadBuitton";

export const FileList = () => {
  const [file, setFile] = useState<File | null>(null);
  const [fileList, setFileList] = useState<ImageItem[]>([]);

  const fetchList = async () => {
    const list = await Storage.fileList();
    setFileList(list);
  };

  useEffect(() => {
    fetchList();
  }, []);

  const handleUpload = () => {
    if (!file) return;
    const uploading = Storage.uploadFile(file);
    uploading.promise().finally(() => {
      fetchList();
      setFile(null);
    });
  };

  const handleDelete = async (id: string) => {
    await Storage.deleteFile(id);
    fetchList();
  };

  return (
    <div className="pt-4">
      <div className="flex items-center gap-4 mb-1">
        <div className="text-2xl font-bold">File List</div>
        <ReloadButton
          onClick={() => {
            setFileList([]);
            fetchList();
          }}
        />
      </div>

      <div className="flex gap-2">
        <input
          type="file"
          accept="image/*"
          className="border-gray-100 border-2 rounded-md p-2"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
        />
        <button
          className="bg-blue-500 text-white p-2 rounded-md"
          onClick={handleUpload}
        >
          Upload
        </button>
      </div>
      <div className="mt-2 flex flex-col gap-2">
        {fileList.map((item) => (
          <div key={item.id} className="flex gap-2 items-center">
            <img src={item.url} alt={item.path} width={80} height={80} />
            {item.path} ({fileSizeFormatter(item.size)})
            <button
              className="text-red-500 font-bold"
              onClick={() => handleDelete(item.id)}
            >
              DEL
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
