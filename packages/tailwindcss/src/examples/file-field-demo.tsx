import {
  FileField,
  FileFieldDropzone,
  FileFieldHiddenInput,
  FileFieldItem,
  FileFieldItemDeleteTrigger,
  FileFieldItemList,
  FileFieldItemName,
  FileFieldItemPreviewImage,
  FileFieldItemSize,
  FileFieldLabel,
  FileFieldTrigger,
} from "@repo/tailwindcss/ui/v4/file-field"

const FileFieldDemo = () => {
  return (
    <FileField
      multiple
      maxFiles={5}
      onFileAccept={(data) => {
        console.log("accept data:", data)
      }}
      onFileReject={(data) => {
        console.log("reject data:", data)
      }}
      onFileChange={(data) => {
        console.log("changed data:", data)
      }}
    >
      <FileFieldDropzone>
        <FileFieldLabel>Drop your files here...</FileFieldLabel>
        <FileFieldTrigger>Choose files!</FileFieldTrigger>
      </FileFieldDropzone>
      <FileFieldHiddenInput />
      <FileFieldItemList>
        {() => (
          <FileFieldItem>
            <FileFieldItemPreviewImage />
            <FileFieldItemName />
            <FileFieldItemSize />
            <FileFieldItemDeleteTrigger />
          </FileFieldItem>
        )}
      </FileFieldItemList>
    </FileField>
  )
}

export default FileFieldDemo
