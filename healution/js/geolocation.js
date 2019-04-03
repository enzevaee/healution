//geo location used navigator.geolocation

let Gl, options, spans;

document.addEventListener('DOMContentLoaded', init);

function init(){
    if (navigator.geolocation){
        let giveUp = 1000 * 30;      //30 sec
        let tooOld = 1000 * 60 * 60;    // 1 hour
        let 
        options ={
            enableHighAccuracy: true,
            time = giveUp,
            maximumAge = tooOld,
            minimumAge = giveUp
        }

        navigator.geolocation.getCurrentPosition(gotPost,postFail,options);

    }else{
        //user uses browser which doesn't support geolocation

    }


}

function gotPost(position){
spans = document.querySelector('p span');
spans[0].textContent = position.coords.latitude;
spans[1].textContent = position.coords.longitude;

spans[6].textContent = position.timestamp;

}

function postFail(err){
    //error is number
    let err = {
        1 : 'No permission', 
        2 : 'Unable to determine',
        3 : 'Took too long'
    }

    document.getSelector('h1').textContent = error[err];
}

