import React from "react";
import faqImg from "../../assets/helpdesk/faq.svg"
export default function Faq () {

    return (
        <div className="faq d-flex flex-column flex-lg-row">
                <div className="">
                    <img src={faqImg} className="img-fluid p-lg-5" width="1000px" />
                </div>
                <div className="container mt-3 mt-lg-0">
                    <div className="accordion d-flex flex-column gap-3 gap-lg-5 w-75 mx-auto mt-lg-5">
                        <div className="accordion-item border border-dark">
                            <h2 className="accordion-header" id="headingOne">
                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                                <strong>Apa itu Ruang Event ?</strong>
                            </button>
                            </h2>
                            <div id="collapseOne" className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                                <strong>Ruang Event</strong> adalah sebuah platform untuk kita dapat mempublikasikan event yang akan kita gelar ke seluruah indonesia bahkan dunia, karena berbasis website sehingga dapat diakses dimana saja kapan saja.
                            </div>
                            </div>
                        </div>
                        <div className="accordion-item border border-dark">
                            <h2 className="accordion-header" id="headingTwo">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                <strong>Cara memposting event</strong>
                            </button>
                            </h2>
                            <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                <div className="accordion-body">
                                    Untuk dapat mempublikasikan event, anda diharuskan log in terlebih dahulu.
                                </div>
                            </div>
                        </div>
                        <div className="accordion-item border border-dark">
                            <h2 className="accordion-header" id="headingThree">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                <strong>kenapa harus memposting event melalui platform kami ?</strong>
                            </button>
                            </h2>
                            <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                                Selain dapat diakses dimana saja sehingga dapat menarik audiens yang lebih banyak, platform kami juga free tanpa dikenakan biaya apapun.
                            </div>
                            </div>
                        </div>

                        {/* FAQ 4-6 */}
                        <div className="accordion-item border border-dark">
                            <h2 className="accordion-header" id="headingFour">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                                <strong>Dapatkah saya mendaftar event meskipun tidak login ?</strong>
                            </button>
                            </h2>
                            <div id="collapseFour" className="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                                Anda dapat mendaftar event melalui link yang tersedia, meskipun belum log in.
                            </div>
                            </div>
                        </div>
                        <div className="accordion-item border border-dark">
                            <h2 className="accordion-header" id="headingFive">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                                <strong>Bagaimana cara membuat akun di Ruang Event ?</strong>
                            </button>
                            </h2>
                            <div id="collapseFive" className="accordion-collapse collapse" aria-labelledby="headingFive" data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                                Klik button register dan siapkan data diri anda seperti email, nama dan password.
                            </div>
                            </div>
                        </div>
                        <div className="accordion-item border border-dark">
                            <h2 className="accordion-header" id="headingSix">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSix" aria-expanded="false" aria-controls="collapseSix">
                                <strong>Dimana saya bisa melihat semua event yang telah saya posting ?</strong>
                            </button>
                            </h2>
                            <div id="collapseSix" className="accordion-collapse collapse" aria-labelledby="headingSix" data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                                Pada halaman profile anda akan menemukan semua event yang telah di posting.
                            </div>
                            </div>
                        </div>

                    </div>
                </div>
        </div>
    )
}