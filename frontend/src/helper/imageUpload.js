  function imageUpload(event,fn){
        const reader = new FileReader()
        reader.onload=() => {
          if(reader.readyState === 2){
            fn(reader.result); // put image as data68 encode in src
          }
        }
        reader.readAsDataURL(event.target.files[0]);
}

export default imageUpload


// now sent image in formData

export function sentFormData(avatarPreview,user){
  
  const formData=new FormData();
    
    // when user not select any image then
    // we sont store default image in formdata
     if(avatarPreview !== '/user.png'){
      formData.set('avatar',avatarPreview)
     }

    for (let value in user) {
      formData.append(value, user[value]);
    }
    //to print the value of formData in console only
    // for (let property of formData.entries()) {
    //   console.log(property[0], property[1]);
    // }
    return formData;
}
