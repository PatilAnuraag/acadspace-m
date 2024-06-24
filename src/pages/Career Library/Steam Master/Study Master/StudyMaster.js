import React from 'react'

function StudyMaster({steamDetails}) {
    
  return (
    <div>
          <section class="Top10eng-clg-join container">
        <heading>
            <b>Top 10 Colleges</b> to join for civil engineering
        </heading>
        <ul class="nav nav-tabs nav-justified p-0" role="tablist">
            <li class="nav-item" role="presentation">
                <a class="nav-link active" id="EngTop10-clg-tab-1" data-bs-toggle="tab" href="#EngTop10-clg-tabs-1" role="tab" aria-controls="EngTop10-clg-tabs-1" aria-selected="true"> India </a>
            </li>
            <li class="nav-item" role="presentation">
                <a class="nav-link" id="EngTop10-clg-tab-2" data-bs-toggle="tab" href="#EngTop10-clg-tabs-2" role="tab" aria-controls="EngTop10-clg-tabs-2" aria-selected="false"> Abroad </a>
            </li>
        </ul>
        <div class="tab-content">
            <div class="tab-pane fade show active" id="EngTop10-clg-tabs-1" role="tabpanel" aria-labelledby="EngTop10-clg-tab-1" >
                <div class="table-responsive ">
                    <table class="table table-striped m-0">
                        <thead>
                            <tr>
                            <th scope="col">College</th>
                            <th scope="col">Location</th>
                            <th scope="col">Exam</th>
                            <th scope="col">Fees/Year</th>
                            <th scope="col">Cut Off</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <th scope="row">IIT Madras</th>
                            <td>Chennai(TN)</td>
                            <td>JEE Mains & Advance</td>
                            <td>2 Lakhs</td>
                            <td>6066</td>
                            </tr>
                            <tr>
                            <th scope="row">IIT Delhi</th>
                            <td>Delhi</td>
                            <td>JEE Mains & Advance</td>
                            <td>2.45 Lakhs</td>
                            <td>4267</td>
                            </tr>
                            <tr>
                            <th scope="row">IIT Bombay</th>
                            <td>Bombay(MH)</td>
                            <td>JEE Mains & Advance</td>
                            <td>2.29 Lakhs</td>
                            <td>4371</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div class="tab-pane fade" id="EngTop10-clg-tabs-2" role="tabpanel" aria-labelledby="EngTop10-clg-tab-2">    
                <div class="table-responsive">
                    <table class="table table-striped m-0">
                        <thead>
                            <tr>
                            <th scope="col">College</th>
                            <th scope="col">Location</th>
                            <th scope="col">Exam</th>
                            <th scope="col">Fees/Year</th>
                            <th class="text-nowrap" scope="col">Cut Off</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <th scope="row">Massachusetts Institute of Technology </th>
                            <td>Cambridge, United States</td>
                            <td>TOEFL/PTE/IELTS/Duolingo</td>
                            <td>48 Lakhs</td>
                            <td>96.5</td>
                            </tr>
                            <tr>
                            <th scope="row">IIT Delhi</th>
                            <td>Delhi</td>
                            <td>JEE Mains & Advance</td>
                            <td>2.45 Lakhs</td>
                            <td>4267</td>
                            </tr>
                            <tr>
                            <th scope="row">IIT Bombay</th>
                            <td>Bombay(MH)</td>
                            <td>JEE Mains & Advance</td>
                            <td>2.29 Lakhs</td>
                            <td>4371</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </section>

    
    </div>
  )
}

export default StudyMaster
