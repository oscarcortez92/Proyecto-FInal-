class MyFramework {
    requestGET(url, lister, tipo) {
        let xml = new XMLHttpRequest();
        ;
        xml.onreadystatechange = function respustaServidor() {
            if (xml.readyState == 4) {
                if (xml.status == 200) {
                    lister.handlerGetResponse(xml.status, xml.responseText, tipo);
                }
            }
        };
        xml.open("GET", url, true);
        xml.send();
    }
    getElementById(id) {
        return document.getElementById(id);
    }
    requestPOST(url, lister, datos, tipo) {
        let xml = new XMLHttpRequest();
        ;
        xml.onreadystatechange = function respustaServidor() {
            if (xml.readyState == 4) {
                if (xml.status == 200) {
                }
            }
        };
        console.log("DATOS", JSON.stringify(datos));
        xml.open("POST", url, true);
        xml.setRequestHeader("Content-Type", "application/json");
        xml.send(JSON.stringify(datos));
    }
}
