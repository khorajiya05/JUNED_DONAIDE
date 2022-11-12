let checkValidDomain = (str)=> {
       
    let pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
     
    return !!pattern.test(str);
  }

  let addAmPMInTime = async (time)=> {
    let t = time
    var [h,m] = t.split(":");
    return await (h%12+12*(h%12==0))+":"+m, h >= 12 ? 'PM' : 'AM';
    
  }

  export {checkValidDomain,addAmPMInTime}