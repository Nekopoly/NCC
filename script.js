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
    fetch('content.json')
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Request failed. Status code:', response.status);
    }
  })
  .then(data => makeTimeline(data))
  .catch(error => console.error(error));
}

function makeTimeline(data){
 var b = false;
 data.forEach(cont => {
    b = !b;
    if (b===true) {
        TL_body.innerHTML += `
            <li class="timeline-item left">
              <div class="timeline-body">
                <div class="timeline-meta">
                  <div class="d-inline-flex flex-column px-2 py-1 text-success-emphasis bg-success-subtle border border-success-subtle rounded-2 text-md-end">
                    <span>`+cont.date+`</span>
                  </div>
                </div>
                <div class="timeline-content timeline-indicator">
                  <div class="card border-0 shadow">
                    <div class="card-body p-xl-4">
                      <img src="`+cont.ImageUrl+`" alt="`+cont.CharName+` 초상화" class="Tn">
                      <h1 class="card-title  mb-2"><span class="NameMarker">`+cont.CharName+`</span></h1>
                      <p class="card-text m-0">`+cont.Description+`</p>
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
                    <span>`+cont.date+`</span>
                  </div>
                </div>
                <div class="timeline-content timeline-indicator">
                  <div class="card border-0 shadow">
                    <div class="card-body p-xl-4">
                      <img src="`+cont.ImageUrl+`" alt="logo" class="Tn">
                      <h1 class="card-title mb-2"><span class="NameMarker">`+cont.CharName+`</span></h1>
                      <p class="card-text m-0">`+cont.Description+`</p>
                    </div>
                  </div>
                </div>
              </div>
            </li>
        `;
    }
 });
}