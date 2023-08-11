const camera = document.querySelector("#video");


 async function iniciar_video()
 {
    const construcao = { video: true };

    try
    {
        let aovivo = await navigator.mediaDevices.getUserMedia(construcao);

        camera.srcObject = aovivo;
        camera.onloadedmetadata = () => {
            camera.play();
        }
    }
    catch (err)
    {
        console.log(err);
    }
 }


 iniciar_video();