export async function uploadImages(files){

    const imageUrls=[];

    for(const file of files){

        const formData=new FormData();

        formData.append("file",file);

        formData.append("upload_preset","gearup_upload");

        const response=await fetch(
            "https://api.cloudinary.com/v1_1/c3paxqxm/image/upload",
            {
                method:"POST",
                body:formData
            }
        );

        const data=await response.json();

        imageUrls.push(data.secure_url);

    }

    return imageUrls;

}