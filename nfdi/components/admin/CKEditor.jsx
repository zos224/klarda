import { CKEditor } from "@ckeditor/ckeditor5-react";
import Editor from "ckeditor5-custom-build";
const CKEditorCustom = ({initData, setData}) => {
    const editorConfiguration = {
        ckfinder: {
            uploadUrl: process.env.NEXT_PUBLIC_UPLOAD_URL,
            options: {
                resourceType: 'Images'
            }
        }
    };
    
    return (
        <div style={{ maxWidth: "none" }} className="prose w-full">
            <CKEditor
                editor={ Editor }
                config={editorConfiguration}
                data={ initData }
                onReady={ editor => {
                    editor.editing.view.change(writer => {
                        writer.setStyle('min-height', '300px', editor.editing.view.document.getRoot());
                        writer.setStyle('background-color', '#ffffff', editor.editing.view.document.getRoot());
                        writer.setStyle('color', '#000000', editor.editing.view.document.getRoot());
                        writer.setStyle('width', '100%', editor.editing.view.document.getRoot());
                    })
                }}
                onChange={ (event, editor ) => {
                    const data = editor.getData();
                    setData(data);
                } }
            />
        </div>
    )
}

export default CKEditorCustom;