import { useState, useEffect } from "react";
import "./FormSection1.css";

const FormSection1 = ({ linguagens }) => {
  const [selectedLang, setSelectedLang] = useState("");
  const [search, setSearch] = useState("");
  const [teams, setTeams] = useState([]);
  let team = [];

  useEffect(() => {
    if (linguagens) {
      setTeams(linguagens);
    } else {
      console.log("linguagens vazio");
    }
  }, [linguagens, search]);

  if (teams) {
    team = teams.filter((team) =>
      team.nomeLinguagem.toLowerCase().includes(search.toLowerCase())
    );
  }

  return (
    <div className="section-3">
      <form action="">
        <div className="selectLang">
          <div className="search_select_box">
            <div className="input-group mb-3" id="addLang">
              <input
                type="text"
                className="form-control"
                placeholder="Recipient's username"
                aria-label="Recipient's username"
                aria-describedby="button-addon2"
              />
              <span className="searching">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                  height="18"
                  width="18 "
                  id="Magnifying-Glass--Streamline-Core"
                >
                  <desc>
                    Magnifying Glass Streamline Icon: https://streamlinehq.com
                  </desc>
                  <g id="magnifying-glass--glass-search-magnifying">
                    <path
                      id="Vector"
                      stroke="#000000"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 11.5c3.03757 0 5.5 -2.46243 5.5 -5.5S9.03757 0.5 6 0.5 0.5 2.96243 0.5 6s2.46243 5.5 5.5 5.5Z"
                      strokeWidth="1"
                    ></path>
                    <path
                      id="Vector_2"
                      stroke="#000000"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5001 13.5 9.88916 9.88904"
                      strokeWidth="1"
                    ></path>
                  </g>
                </svg>
              </span>
            </div>

            <div className="search-box">
              <div className="row-box">
                <input
                  type="text"
                  id="input-box"
                  placeholder="Search language"
                  autoComplete="off"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button className="search-lang-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                    height="18"
                    width="18 "
                    id="Magnifying-Glass--Streamline-Core"
                  >
                    <desc>
                      Magnifying Glass Streamline Icon: https://streamlinehq.com
                    </desc>
                    <g id="magnifying-glass--glass-search-magnifying">
                      <path
                        id="Vector"
                        stroke="#000000"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 11.5c3.03757 0 5.5 -2.46243 5.5 -5.5S9.03757 0.5 6 0.5 0.5 2.96243 0.5 6s2.46243 5.5 5.5 5.5Z"
                        strokeWidth="1"
                      ></path>
                      <path
                        id="Vector_2"
                        stroke="#000000"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5001 13.5 9.88916 9.88904"
                        strokeWidth="1"
                      ></path>
                    </g>
                  </svg>
                </button>
              </div>

              <div className="result-box">
                <ul className="list-group">
                  {team.length > 0 &&
                    team.map((linguagem) => (
                      <li key={linguagem.idLinguagem}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 14 14"
                          height="14"
                          width="14"
                          id="Add-Square--Streamline-Core"
                        >
                          <desc>
                            Add Square Streamline Icon: https://streamlinehq.com
                          </desc>
                          <g id="add-square--square-remove-cross-buttons-add-plus-button-+-mathematics-math">
                            <path
                              id="Vector"
                              stroke="#000000"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m1 2 0 10c0 0.5523 0.44772 1 1 1l10 0c0.5523 0 1 -0.4477 1 -1l0 -10c0 -0.55229 -0.4477 -1 -1 -1L2 1c-0.55228 0 -1 0.44772 -1 1Z"
                              strokeWidth="1"
                            ></path>
                            <path
                              id="Vector_2"
                              stroke="#000000"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M7 4v6"
                              strokeWidth="1"
                            ></path>
                            <path
                              id="Vector_3"
                              stroke="#000000"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M4 7h6"
                              strokeWidth="1"
                            ></path>
                          </g>
                        </svg>
                        {linguagem.nomeLinguagem}
                      </li>
                    ))}
                </ul>
              </div>
            </div>

            <select
              className="form-select w-100"
              data-live-search="true"
              value={selectedLang}
              onChange={(e) => setSelectedLang(e.target.value)}
            >
              <option value="">Selecione uma linguagem</option>
              {linguagens &&
                linguagens.map((linguagem) => (
                  <option name="" id="" key={linguagem.idLinguagem}>
                    {" "}
                    {linguagem.nomeLinguagem}{" "}
                  </option>
                ))}
            </select>
          </div>

          <div className="handleLang">
            <ul className="list-group">
              {linguagens &&
                linguagens.map((linguagem) => (
                  <li
                    className="list-group-item d-flex justify-content-between align-items-center"
                    name=""
                    id=""
                    key={linguagem.idLinguagem}
                  >
                    <button className="delete-selected-lang">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 14"
                        height="18"
                        width="18"
                        id="Subtract-Square--Streamline-Core"
                      >
                        <desc>
                          Subtract Square Streamline Icon:
                          https://streamlinehq.com
                        </desc>
                        <g id="subtract-square--subtract-buttons-remove-add-button-square-delete-mathematics-math-minus">
                          <path
                            id="Vector"
                            stroke="#000000"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m1 2 0 10c0 0.5523 0.44772 1 1 1l10 0c0.5523 0 1 -0.4477 1 -1l0 -10c0 -0.55229 -0.4477 -1 -1 -1L2 1c-0.55228 0 -1 0.44772 -1 1Z"
                            strokeWidth="1"
                          ></path>
                          <path
                            id="Vector_2"
                            stroke="#000000"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4 7h6"
                            strokeWidth="1"
                          ></path>
                        </g>
                      </svg>
                    </button>{" "}
                    {linguagem.nomeLinguagem}{" "}
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FormSection1;
