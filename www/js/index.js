/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        cargarRutas("http://localhost/xampp/prueba1/www/json/rutas.json");
        app.receivedEvent('deviceready');
        
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

function cargarRutas(urlP)
{
    
    $.ajax(
    {
       url:urlP, 
        type:"get",
        dataType:"text",
        success: function(data)
        {
            var rutasJSON = $.parseJSON(data).RutasElBosque[0].Rutas;
            //document.getElementById('response').innerHTML = rutasJSON.length; 

            document.getElementById('response').innerHTML = "";

            for(var i = 0; i < rutasJSON.length; i++)
            {
                
                var ruta = rutasJSON[i];
                var imgBus = "busRojo.png";
                if(ruta.Disponibilidad > 6)
                    {
                        imgBus = "busVerde.png";
                    }
                document.getElementById('response').innerHTML += "<TABLE BORDER=1 WIDTH=300>";
                document.getElementById('response').innerHTML += '<TR><TD  ROWSPAN=5><IMG SRC="./img/'+imgBus+'"><td/>'+ruta.Recorrido+'</TR>';
document.getElementById('response').innerHTML += '<TR><TD WIDTH=100>'+ruta.Hora+'</TD></TR>';
document.getElementById('response').innerHTML += '<TR><TD WIDTH=100 >'+ruta.Disponibilidad+'</TD></TR>';
document.getElementById('response').innerHTML += '<TR><TD WIDTH=100><a href="#">VER MAPA</a></TD></TR>';
document.getElementById('response').innerHTML += '<TR><TD WIDTH=100><a href="#">RESERVAR</a></TD></TR>';      
                document.getElementById('response').innerHTML += "</TABLE><br>";
            }
            
        },
        error: function()
        {
            document.getElementById('response').innerHTML = "No se pueden cargar las rutas"; 

        }
    });
    
}