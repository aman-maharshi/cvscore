import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { formatSize } from "../lib/utils"

interface FileUploaderProps {
  onFileSelect?: (file: File | null) => void
}

const FileUploader = ({ onFileSelect }: FileUploaderProps) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0] || null
      onFileSelect?.(file)
    },
    [onFileSelect]
  )

  const maxFileSize = 20 * 1024 * 1024 // 20MB in bytes

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({
    onDrop,
    multiple: false,
    accept: { "application/pdf": [".pdf"] },
    maxSize: maxFileSize,
  })

  const file = acceptedFiles[0] || null

  return (
    <div className="w-full">
      <div {...getRootProps()}>
        <input {...getInputProps()} />

        <div className="cursor-pointer">
          {file ? (
            <div
              className="group relative overflow-hidden rounded-xl border-2 border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:border-gray-300 hover:shadow-md"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50">
                    <img src="/images/pdf.png" alt="pdf" className="h-8 w-8" />
                  </div>
                  <div className="flex flex-col">
                    <p className="max-w-xs truncate text-sm font-semibold text-gray-900">
                      {file.name}
                    </p>
                    <p className="text-xs text-gray-500">{formatSize(file.size)}</p>
                  </div>
                </div>
                <button
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-400 transition-all duration-200 group-hover:bg-gray-200 hover:bg-red-50 hover:text-red-500"
                  onClick={(e) => {
                    e.stopPropagation()
                    onFileSelect?.(null)
                  }}
                >
                  <img src="/icons/cross.svg" alt="remove" className="h-4 w-4" />
                </button>
              </div>
            </div>
          ) : (
            <div
              className={`relative overflow-hidden rounded-xl border-2 border-dashed transition-all duration-300 ${
                isDragActive
                  ? "border-blue-400 bg-blue-50 shadow-lg"
                  : "border-gray-300 bg-gray-50 hover:border-gray-400 hover:bg-gray-100"
              } `}
            >
              <div className="flex min-h-[160px] flex-col items-center justify-center p-8 text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-sm">
                  <img
                    src="/icons/info.svg"
                    alt="upload"
                    className={`h-8 w-8 transition-all duration-300 ${
                      isDragActive ? "scale-110 text-blue-500" : "text-gray-400"
                    }`}
                  />
                </div>
                <div className="space-y-2">
                  <p className="text-lg font-semibold text-gray-700">
                    {isDragActive ? "Drop your PDF here" : "Upload your resume"}
                  </p>
                  <p className="text-sm text-gray-500">
                    {isDragActive ? "Release to upload" : "Click to browse or drag and drop"}
                  </p>
                  <p className="text-xs text-gray-400">
                    PDF files only • Max {formatSize(maxFileSize)}
                  </p>
                </div>
              </div>

              {/* Animated border effect */}
              {isDragActive && (
                <div className="absolute inset-0 animate-pulse rounded-xl border-2 border-blue-400 bg-blue-50 opacity-20"></div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default FileUploader
