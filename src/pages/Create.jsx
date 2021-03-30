// import React from 'react';
// import Upload from '../assets/upload.svg';
// // http://codepickup.in/php/create-a-zoom-meeting-using-zoom-api/
// const Create = () => {
//     const [body, setBody] = React.useState({
//         title: "",
//         description: ""
//     });
//     console.log(body);
//
//
//     return (
//         <div className="main__container">
//             <div className="formBox formBox__grid">
//                 <h2>CREATE</h2>
//                 <form action="" method="POST" className="create__grid">
//                     <div className="form_groupbox">
//                         <div className="form-group">
//                             <label className="form-group_label">Название</label>
//                             <input className="form_element" type="text" placeholder="Название" value={body.title} onChange={e => {
//                                 const val = e.target.value;
//                                 setBody(prevState => {
//                                     return {...prevState, title: val}
//                                 });
//                             }} required/>
//                         </div>
//                     </div>
//                     <div className="form_groupbox">
//                         <div className="form-group">
//                             <label className="form-group_label">Дата начала</label>
//                             <input className="form_element" type="date"/>
//                         </div>
//                         <div className="form-group">
//                             <label className="form-group_label">Дата окончания</label>
//                             <input className="form_element" type="date"/>
//                         </div>
//                     </div>
//                     <div className="form-group">
//                         <label className="form-group_label">Описание</label>
//                         <textarea className="form_element" name="description" cols="10" rows="5" placeholder="Описание"></textarea>
//                     </div>
//                     <div className="form_groupbox">
//                         <div className="form-group">
//                             <label className="form-group_label">Тип</label>
//                             <div className="form-group__double">
//                                 <input type="radio" id="input__public" name="type" value="public"/>
//                                 <label htmlFor="input__public">Публичный</label>
//                             </div>
//                             <div className="form-group__double">
//                                 <input type="radio" id="input__private" name="type" value="private"/>
//                                 <label htmlFor="input__private">Приватный</label>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="form_groupbox">
//                         <div className="form-group">
//                             <label className="form-group_label">Цена</label>
//                             <input className="form_element form-group_element" type="number" min="0" step="10" placeholder="Цена"/>
//                         </div>
//                         <div className="form-group">
//                             <label className="form-group_label">Баннер</label>
//                             <div className="input__fileBox">
//                                 <input name="file" type="file" name="file" id="input__file" className="form_element" name="file"
//                                     className="input input__file" />
//                                 <label htmlFor="input__file" className="input__file-button">
//                                     <span className="input__file-icon-wrapper"><img className="input__file-icon"
//                                         src={Upload}
//                                         alt="Загрузить картинку"
//                                         width="25" /></span>
//                                     <span className="input__file-button-text">Превью</span>
//                                 </label>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="form-group">
//                         <label className="form-group_label">Периодичность</label>
//                         <select name="type" className="form_element" id="list">
//                             <option value="j">Не повторяется</option>
//                             <option value="k">Каждый рабочий день</option>
//                             <option value="k">Ежедневно</option>
//                             <option value="k">Еженедельно</option>
//                             <option value="k">Ежемесячно</option>
//                             <option value="k">Ежегодно</option>
//                         </select>
//                     </div>
//                     <div className="form_groupbox">
//                         <div className="form-group">
//                             <label className="form-group_label">Старт продаж
//                             <input className="form_element form-element__double" type="date" /></label>
//                         </div>
//                         <div className="form-group">
//                             <label className="form-group_label">Окончание продаж
//                             <input className="form_element" type="date" /></label>
//                         </div>
//                     </div>
//                     <input className="button__submit" type="submit" value="Создать" />
//                 </form>
//             </div>
//         </div >
//     );
// }
// export default Create;