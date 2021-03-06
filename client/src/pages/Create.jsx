import React from 'react';
import Upload from "../assets/upload.svg";
import {useDispatch, useSelector} from "react-redux";
import {create} from "../redux/actions/create";

const CreatePage = ({id}) => {
    const dispatch = useDispatch();
    const [step, setStep] = React.useState(0);
    const [selectedFiles, setSelectedFiles] = React.useState([]);
    const [body, setBody] = React.useState({
        title: "Test",
        description: "Lorem ipsum dolor sit amet",
        price: 0,
        maxParticipants: 12,
        startDate: "",
        startTime: "",
        type: "",
        periodic: "",
        category: "",
        tags: "",
        user: id
    });
    let res = useSelector(({create}) => create.respond);
    React.useEffect(() => {
        if(res) {
            setStep(3);
        }
    },[res])
    React.useEffect(() => {
        if(step === 3) {
            setTimeout( () => {
                setStep(1);
            }, 5000);
        }
    },[step])

    const nextDisabled = !body.title || !body.description || !body.startDate || !body.startTime || !body.type || !body.periodic;

    function handleChangeFiles(e) {
        let files = e.target.files;
        let filesArr = Array.prototype.slice.call(files);
        setSelectedFiles({ files: [...selectedFiles, ...filesArr] });
    }
    function nextStep(num) {
        setStep(num)
    }

    const sendForm = (e) => {
        e.preventDefault();
        e.stopPropagation();
        let fd = new FormData();
        if(selectedFiles.length !== 0) {
            selectedFiles.files.forEach((file) => {
                fd.append('file', file)
            })
        }
        for (let k in body) {
            fd.append(k, typeof body[k] === "string" ? body[k] : JSON.stringify(body[k]));
        }
        dispatch(create(fd));
        setBody({
            title: "",
            description: "",
            price: 0,
            maxParticipants: 12,
            startDate: "",
            startTime: "",
            type: "",
            periodic: "",
            category: "",
            tags: "",
            user: id
        })
    }



    return (
        <div className="main__container">
            <div className="creatingPage_container">
                <h2>???????????????? ??????????????</h2>
                <div className="header__create">
                    <ul>
                        <li className={step == 0 ? "active" : ""} onClick={() => nextStep(0)}>?????? 1: ????????????????</li>
                        <li className={step == 1 ? "active" : ""} onClick={() => nextStep(1)}>?????? 2: ??????????</li>
                        <li className={step == 2 ? "active" : ""} onClick={() => nextStep(2)}>?????? 3: ??????????????????</li>
                    </ul>
                </div>
                <form className="form_create" action="/api/createEvent" method="POST" encType="multipart/form-data">
                    {
                        step === 0 &&
                        <div className="stepBox">
                            <div className="stepBox__row">
                                <label htmlFor="title">????????????????</label>
                                <input type="text" id="title" placeholder="????????????????" value={body.title} onChange={e => {
                                                        const val = e.target.value;
                                                         setBody(prevState => {
                                                             return {...prevState, title: val}
                                                         });
                                                     }} required/>
                            </div>
                            <div className="stepBox__column">
                                <label>????????????????</label>
                                <textarea name="description" cols="10" rows="5" placeholder="????????????????"
                                          value={body.description}
                                          onChange={e => {
                                              const val = e.target.value;
                                              setBody(prevState => {
                                                  return {...prevState, description: val}
                                              });
                                          }} required></textarea>
                            </div>
                            <div className="form_groupbox">
                                <div className="stepBox__column">
                                    <label>????????</label>
                                    <input type="number" min="0" step="10" max="7000" placeholder="????????"
                                           value={body.price} onChange={e => {
                                        const val = e.target.value;
                                        setBody(prevState => {
                                            return {...prevState, price: val}
                                        });
                                    }}
                                    />
                                </div>
                                <div className="stepBox__column">
                                    <label>????????????</label>
                                    <div className="input__fileBox">
                                        <input name="file" type="file" id="input__file" className="form_element" name="file"
                                               className="input input__file" onChange={handleChangeFiles}/>
                                        <label htmlFor="input__file" className="input__file-button">
                                        <span className="input__file-icon-wrapper"><img className="input__file-icon"
                                                                                        src={Upload}
                                                                                        alt="?????????????????? ????????????????"
                                                                                        width="25" /></span>
                                            <span className="input__file-button-text">????????????</span>
                                        </label>
                                    </div>
                                </div>
                                <div className="stepBox__column">
                                    <label>??????.????????</label>
                                    <input type="number" min="0" step="10" max="50" placeholder="????????"
                                           value={body.maxParticipants} onChange={e => {
                                        const val = e.target.value;
                                        setBody(prevState => {
                                            return {...prevState, maxParticipants: val}
                                        });
                                    }}
                                    />
                                </div>
                            </div>
                            <button onClick={() => nextStep(1)}>????????????????????</button>
                        </div>
                    }
                    {
                        step === 1 &&
                        <div className="stepBox">
                            <div className="form_groupbox">
                                <div className="stepBox__column">
                                    <label htmlFor="date">???????? ??????????????</label>
                                        <input id="date" type="date"
                                               value={body.startDate} onChange={e => {
                                                   const val = e.target.value;
                                                   setBody(prevState => {
                                                       return {...prevState, startDate: val}
                                                   });
                                               }} required/>
                                </div>
                                <div className="stepBox__column">
                                    <label htmlFor="time">?????????? ????????????</label>
                                        <input id="time" type="time" value={body.startTime} onChange={e => {
                                            const val = e.target.value;
                                            setBody(prevState => {
                                                return {...prevState, startTime: val}
                                            });
                                        }} required/>
                                </div>
                            </div>
                            <div className="form_groupbox">
                                <div className="stepBox__column">
                                    <label>??????</label>
                                    <div className="stepBox__row">
                                        <div>
                                            <input type="radio" id="input__public" name="type" value="public" value={body.type}
                                                   onChange={e => {
                                                       const val = e.target.value;
                                                       setBody(prevState => {
                                                           return {...prevState, type: "public"}
                                                       });
                                                   }} required/>
                                            <label htmlFor="input__public">??????????????????</label>
                                        </div>
                                        <div>
                                            <input type="radio" id="input__private" name="type" value="private" value={body.type}
                                                   onChange={e => {
                                                       const val = e.target.value;
                                                       setBody(prevState => {
                                                           return {...prevState, type: "private"}
                                                       });
                                                   }} required/>
                                            <label htmlFor="input__private">??????????????????</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="stepBox__column">
                                <label htmlFor="list">??????????????????????????</label>
                                <select name="type" id="list"  value={body.periodic} onChange={e => {
                                    const val = e.target.value;
                                    setBody(prevState => {
                                        return {...prevState, periodic: val}
                                    });
                                }} required>
                                    <option value="No_repeat">???? ??????????????????????</option>
                                    <option value="Every_work_day">???????????? ?????????????? ????????</option>
                                    <option value="Every_day">??????????????????</option>
                                    <option value="Every_week">??????????????????????</option>
                                    <option value="Every_month">????????????????????</option>
                                    <option value="Every_year">????????????????</option>
                                </select>
                            </div>
                            <button onClick={() => nextStep(2)}>????????????????????</button>
                        </div>
                    }
                    {
                        step === 2 &&
                        <div className="stepBox">
                            <div className="stepBox__column">
                                <label htmlFor="category">??????????????????</label>
                                <select name="type" id="category"  value={body.category} onChange={e => {
                                    const val = e.target.value;
                                    setBody(prevState => {
                                        return {...prevState, category: val}
                                    });
                                }}>
                                    <option value="??????">??????</option>
                                    <option value="?????????????????????? ?? ??????????">?????????????????????? ?? ??????????</option>
                                    <option value="???????????????? ?? ????????????????????">???????????????? ?? ????????????????????</option>
                                    <option value="????????????">????????????</option>
                                    <option value="?????????????????? ?? ??????????????????????">?????????????????? ?? ??????????????????????</option>
                                    <option value="???????????????? ?? ??????????">???????????????? ?? ??????????</option>
                                    <option value="?????????????? ?? ??????????">?????????????? ?? ??????????</option>
                                    <option value="????????????">????????????</option>
                                </select>
                            </div>
                            <div className="stepBox__row">
                                <label htmlFor="tags">????????</label>
                                <input type="text" id="tags" placeholder="#??????#??????" value={body.tags} onChange={e => {
                                    const val = e.target.value;
                                    setBody(prevState => {
                                        return {...prevState, tags: val}
                                    });
                                }}/>
                            </div>
                            <button disabled={nextDisabled} onClick={sendForm}>?????????????? ??????????????</button>
                        </div>
                    }
                    {
                        step === 3 &&
                        <div className="stepBox respond">
                            <h3>?????????????? ??????????????!</h3>
                        </div>
                    }
                </form>
            </div>
        </div>
    );
};
export default CreatePage;