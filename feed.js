/**
 *  왼쪽
 * 
 *  <ul class="timeline" id="TL_data">
            <li class="timeline-item left">
              <div class="timeline-body">
                <div class="timeline-meta">
                  <div class="d-inline-flex flex-column px-2 py-1 text-success-emphasis bg-success-subtle border border-success-subtle rounded-2 text-md-end">
                    <span>Released on 05 May 2021</span>
                  </div>
                </div>
                <div class="timeline-content timeline-indicator">
                  <div class="card border-0 shadow">
                    <div class="card-body p-xl-4">
                      <h2 class="card-title mb-2">Bootstrap 5</h2>
                      <h6 class="card-subtitle text-secondary mb-3">Active Support</h6>
                      <p class="card-text m-0">Powerful, extensible, and feature-packed frontend toolkit. Build and customize with Sass, utilize prebuilt grid system and components, and bring projects to life with powerful JavaScript plugins.</p>
                    </div>
                  </div>
                </div>
              </div>
            </li>
   -----오른쪽-----
            <li class="timeline-item right">
              <div class="timeline-body">
                <div class="timeline-meta">
                  <div class="d-inline-flex flex-column px-2 py-1 text-success-emphasis bg-success-subtle border border-success-subtle rounded-2 text-md-end">
                    <span>Released on 18 Jan 2018</span>
                  </div>
                </div>
                <div class="timeline-content timeline-indicator">
                  <div class="card border-0 shadow">
                    <div class="card-body p-xl-4">
                      <h2 class="card-title mb-2">Bootstrap 4</h2>
                      <h6 class="card-subtitle text-secondary mb-3">No Active Support</h6>
                      <p class="card-text m-0">Get started with Bootstrap, the world’s most popular framework for building responsive, mobile-first sites, with jsDelivr and a template starter page. Bootstrap 4 has no active support.</p>
                    </div>
                  </div>
                </div>
              </div>
            </li>
 * 
 */
            var TL_body = document.getElementById("renderTimeline");
            window.onload = function(){
                fetch('https://github.com/Nekopoly/NCC/commits.atom')
                .then(response => response.text())
                .then(str =>{
                    let xml = new DOMParser().parseFromString(str, "application/xml");
                    var basket = xmlToJson(xml);
                    console.log(basket.feed.entry);
                    makeTimeline(basket.feed.entry);
                });
                //.catch(error => console.error(error));
            }
            
            function makeTimeline(data){
             moment.locale('ko-kr');
             var b = false;
             data.forEach(cont => {
                b = !b;
                if (b===true) {
                    TL_body.innerHTML += `
                        <li class="timeline-item left">
                          <div class="timeline-body">
                            <div class="timeline-meta">
                              <div class="d-inline-flex flex-column px-2 py-1 text-success-emphasis bg-success-subtle border border-success-subtle rounded-2 text-md-end">
                                <span>`+moment(cont.updated).format('YYYY-M-D, h:mm:ss a')+`</span>
                              </div>
                            </div>
                            <div class="timeline-content timeline-indicator">
                              <div class="card border-0 shadow">
                                <div class="card-body p-xl-4">
                                  <p class="card-text m-0">`+cont.title+`</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                    `;
                } else {
                    TL_body.innerHTML += `
                        <li class="timeline-item right">
                        <div class="timeline-body">
                        <div class="timeline-meta">
                          <div class="d-inline-flex flex-column px-2 py-1 text-success-emphasis bg-success-subtle border border-success-subtle rounded-2 text-md-end">
                            <span>`+moment(cont.updated).format('YYYY-M-D, h:mm:ss a')+`</span>
                          </div>
                        </div>
                        <div class="timeline-content timeline-indicator">
                          <div class="card border-0 shadow">
                            <div class="card-body p-xl-4">
                              <p class="card-text m-0">`+cont.title+`</p>
                            </div>
                          </div>
                        </div>
                        </div>
                        </li>
                    `;
                }
             });
            }
            //https://velog.io/@duboo/javascript-XML-to-JSON-%EB%B3%80%ED%99%98
            function xmlToJson(xml) {
                // Create the return object
                var obj = {};
              
                if (xml.nodeType == 1) {
                  // element
                  // do attributes
                  if (xml.attributes.length > 0) {
                    obj["@attributes"] = {};
                    for (var j = 0; j < xml.attributes.length; j++) {
                      var attribute = xml.attributes.item(j);
                      obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
                    }
                  }
                } else if (xml.nodeType == 3) {
                  // text
                  obj = xml.nodeValue;
                }
              
                // do children
                // If all text nodes inside, get concatenated text from them.
                var textNodes = [].slice.call(xml.childNodes).filter(function(node) {
                  return node.nodeType === 3;
                });
                if (xml.hasChildNodes() && xml.childNodes.length === textNodes.length) {
                  obj = [].slice.call(xml.childNodes).reduce(function(text, node) {
                    return text + node.nodeValue;
                  }, "");
                } else if (xml.hasChildNodes()) {
                  for (var i = 0; i < xml.childNodes.length; i++) {
                    var item = xml.childNodes.item(i);
                    var nodeName = item.nodeName;
                    if (typeof obj[nodeName] == "undefined") {
                      obj[nodeName] = xmlToJson(item);
                    } else {
                      if (typeof obj[nodeName].push == "undefined") {
                        var old = obj[nodeName];
                        obj[nodeName] = [];
                        obj[nodeName].push(old);
                      }
                      obj[nodeName].push(xmlToJson(item));
                    }
                  }
                }
                return obj;
              }