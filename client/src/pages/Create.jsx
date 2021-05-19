import React from 'react';
import Upload from "../assets/upload.svg";
import {useDispatch, useSelector} from "react-redux";
import {create} from "../redux/actions/create";

const CreatePage = ({id}) => {
    const dispatch = useDispatch();
    const [step, setStep] = React.useState(0);
    console.log(step)
    const [selectedFiles, setSelectedFiles] = React.useState([]);
    const [body, setBody] = React.useState({
        title: "Test",
        description: "Lorem ipsum dolor sit amet",
        price: 10,
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
    console.log("res", res)
    React.useEffect(() => {
        if(res) {
            console.log("jkkhlh")
            setStep(3);
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
                <h2>СОЗДАНИЕ СОБЫТИЯ</h2>
                <div className="header__create">
                    <ul>
                        <li className={step == 0 ? "active" : ""} onClick={() => nextStep(0)}>Шаг 1: Описание</li>
                        <li className={step == 1 ? "active" : ""} onClick={() => nextStep(1)}>Шаг 2: Время</li>
                        <li className={step == 2 ? "active" : ""} onClick={() => nextStep(2)}>Шаг 3: Категории</li>
                    </ul>
                </div>
                <form className="form_create" action="/api/createEvent" method="POST" encType="multipart/form-data">
                    {
                        step === 0 &&
                        <div className="stepBox">
                            <div className="stepBox__row">
                                <label htmlFor="title">Название</label>
                                <input type="text" id="title" placeholder="Название" value={body.title} onChange={e => {
                                                        const val = e.target.value;
                                                         setBody(prevState => {
                                                             return {...prevState, title: val}
                                                         });
                                                     }} required/>
                            </div>
                            <div className="stepBox__column">
                                <label>Описание</label>
                                <textarea name="description" cols="10" rows="5" placeholder="Описание"
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
                                    <label>Цена</label>
                                    <input type="number" min="0" step="10" max="7000" placeholder="Цена"
                                           value={body.price} onChange={e => {
                                        const val = e.target.value;
                                        setBody(prevState => {
                                            return {...prevState, price: val}
                                        });
                                    }}
                                    />
                                </div>
                                <div className="stepBox__column">
                                    <label>Баннер</label>
                                    <div className="input__fileBox">
                                        <input name="file" type="file" id="input__file" className="form_element" name="file"
                                               className="input input__file" onChange={handleChangeFiles}/>
                                        <label htmlFor="input__file" className="input__file-button">
                                        <span className="input__file-icon-wrapper"><img className="input__file-icon"
                                                                                        src={Upload}
                                                                                        alt="Загрузить картинку"
                                                                                        width="25" /></span>
                                            <span className="input__file-button-text">Превью</span>
                                        </label>
                                    </div>
                                </div>
                                <div className="stepBox__column">
                                    <label>Кол.мест</label>
                                    <input type="number" min="0" step="10" max="50" placeholder="Цена"
                                           value={body.maxParticipants} onChange={e => {
                                        const val = e.target.value;
                                        setBody(prevState => {
                                            return {...prevState, maxParticipants: val}
                                        });
                                    }}
                                    />
                                </div>
                            </div>
                            <button onClick={() => nextStep(1)}>Продолжить</button>
                        </div>
                    }
                    {
                        step === 1 &&
                        <div className="stepBox">
                            <div className="form_groupbox">
                                <div className="stepBox__column">
                                    <label htmlFor="date">Дата события</label>
                                        <input id="date" type="date"
                                               value={body.startDate} onChange={e => {
                                                   const val = e.target.value;
                                                   setBody(prevState => {
                                                       return {...prevState, startDate: val}
                                                   });
                                               }} required/>
                                </div>
                                <div className="stepBox__column">
                                    <label htmlFor="time">Время начала</label>
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
                                    <label>Тип</label>
                                    <div className="stepBox__row">
                                        <div>
                                            <input type="radio" id="input__public" name="type" value="public" value={body.type}
                                                   onChange={e => {
                                                       const val = e.target.value;
                                                       setBody(prevState => {
                                                           return {...prevState, type: "public"}
                                                       });
                                                   }} required/>
                                            <label htmlFor="input__public">Публичный</label>
                                        </div>
                                        <div>
                                            <input type="radio" id="input__private" name="type" value="private" value={body.type}
                                                   onChange={e => {
                                                       const val = e.target.value;
                                                       setBody(prevState => {
                                                           return {...prevState, type: "private"}
                                                       });
                                                   }} required/>
                                            <label htmlFor="input__private">Приватный</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="stepBox__column">
                                <label htmlFor="list">Периодичность</label>
                                <select name="type" id="list"  value={body.periodic} onChange={e => {
                                    const val = e.target.value;
                                    setBody(prevState => {
                                        return {...prevState, periodic: val}
                                    });
                                }} required>
                                    <option value="No_repeat">Не повторяется</option>
                                    <option value="Every_work_day">Каждый рабочий день</option>
                                    <option value="Every_day">Ежедневно</option>
                                    <option value="Every_week">Еженедельно</option>
                                    <option value="Every_month">Ежемесячно</option>
                                    <option value="Every_year">Ежегодно</option>
                                </select>
                            </div>
                            <button onClick={() => nextStep(2)}>Продолжить</button>
                        </div>
                    }
                    {
                        step === 2 &&
                        <div className="stepBox">
                            <div className="stepBox__column">
                                <label htmlFor="category">Категории</label>
                                <select name="type" id="category"  value={body.category} onChange={e => {
                                    const val = e.target.value;
                                    setBody(prevState => {
                                        return {...prevState, category: val}
                                    });
                                }}>
                                    <option value="All">Все</option>
                                    <option value="Education_and_science">Образование и наука</option>
                                    <option value="Tech">Интернет и технологии</option>
                                    <option value="Business">Бизнес</option>
                                    <option value="Entertainment_and_Art">Искусство и развлечения</option>
                                    <option value="Health_and_sport">Здоровье и спорт</option>
                                    <option value="Beauty_style">Красота и стиль</option>
                                    <option value="Other">Другое</option>
                                </select>
                            </div>
                            <div className="stepBox__row">
                                <label htmlFor="tags">Тэги</label>
                                <input type="text" id="tags" placeholder="#тэг#тэг" value={body.tags} onChange={e => {
                                    const val = e.target.value;
                                    setBody(prevState => {
                                        return {...prevState, tags: val}
                                    });
                                }}/>
                            </div>
                            <button disabled={nextDisabled} onClick={sendForm}>Создать событие</button>
                        </div>
                    }
                    {
                        step === 3 &&
                        <div className="stepBox respond">
                            <h3>Событие создано!</h3>
                        </div>
                    }
                </form>
            </div>
        </div>
    );
};
export default CreatePage;