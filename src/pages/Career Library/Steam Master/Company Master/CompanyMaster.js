import React from 'react'

function CompanyMaster() {
  return (
    <div>
          <section class="enginner-company-data container">
        <heading>
            <b>Top Companies </b>to work with
        </heading>
        <ul class="nav nav-tabs nav-justified p-0" role="tablist">
            <li class="nav-item" role="presentation">
                <a class="nav-link active" id="eng-CompanyData-tab-1" data-bs-toggle="tab" href="#eng-CompanyData-tabs-1" role="tab" aria-controls="eng-CompanyData-tabs-1" aria-selected="true"> Private </a>
            </li>
            <li class="nav-item" role="presentation">
                <a class="nav-link" id="eng-CompanyData-tab-2" data-bs-toggle="tab" href="#eng-CompanyData-tabs-2" role="tab" aria-controls="eng-CompanyData-tabs-2" aria-selected="false"> Government </a>
            </li>
        </ul>
        <div class="tab-content">
            <div class="tab-pane fade show active" id="eng-CompanyData-tabs-1" role="tabpanel" aria-labelledby="eng-CompanyData-tab-1" >
            
                <div class="eng-CompanyData-three-columns">
                <div>Hindustan Construction Company (HCC)</div>
                <div>Lodha Group</div>
                <div>Larsen & Toubro</div>

                <div>Tata Projects LTD</div>
                <div>Punj Lloyd</div>
                <div>Afcons Infrastructure Limited</div>

                <div>Simplex Infrastructure Limited</div>
                <div>DLF Limited </div>
                <div>Essar Group </div>

                <div>Engineers India</div>
                <div>National Buildings Construction Corporation</div>
                <div> DRDO</div>

                <div> RITES </div>
                <div>IRCON International Limited</div>
            </div>

            </div>
            <div class="tab-pane fade" id="eng-CompanyData-tabs-2" role="tabpanel" aria-labelledby="eng-CompanyData-tab-2">
                Tab 2 content Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptates, doloremque
                minima mollitia sapiente illo ut harum fugit explicabo error perspiciatis at cumque nisi eaque
                commodi culpa est sed ad amet.
            </div>
        </div>
    </section>
    </div>
  )
}

export default CompanyMaster
