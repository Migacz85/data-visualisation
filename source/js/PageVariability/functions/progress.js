function progress(loading) {

    
        document.getElementById("progress").innerHTML = "Loading data: " + (loading/6*100).toFixed(0)  + "%"
        document.getElementById("progress").style.width= (loading/6)*100 + "%";
        if (loading==6 || loading==0 ) {
            document.getElementById("progress-bar").style.display = 'none' 
        } else {
            document.getElementById("progress-bar").style.display = 'block'     
        }
    
    
    
}