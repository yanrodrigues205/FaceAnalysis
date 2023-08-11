const camera = document.querySelector("#video");

Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri("/models"), //detecta a face com ampla facilidade e otimizado
    faceapi.nets.faceLandmark68Net.loadFromUri("/models"), // captura pontos de referencias do rosto
    faceapi.nets.faceRecognitionNet.loadFromUri("/models"), // reconhece rosto na tela
    faceapi.nets.faceExpressionNet.loadFromUri("/models")   // responsavel pelas expressoes
]).then(iniciar_video())

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

 camera.addEventListener("play", () => {

    const canvas = faceapi.createCanvasFromMedia(camera);
    document.body.append(canvas);

    const displayTamanho = { width: camera.width, height: camera.height };

    faceapi.matchDimensions(canvas, displayTamanho); 
    setInterval( async () => {
        const deteccao = await faceapi.detectAllFaces(
            camera,
            new faceapi.TinyFaceDetectorOptions()
        ) 
        .withFaceLandmarks()
        .withFaceExpressions()
       
        const deteccoes = faceapi.resizeResults(deteccao, displayTamanho);

        canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
       
        faceapi.draw.drawDetections(canvas, deteccoes);
        faceapi.draw.drawFaceLandmarks(canvas, deteccoes);
        faceapi.draw.drawFaceExpressions(canvas, deteccoes);
    }, 1000);


   
 });

