import React from 'react';
import Upload from "../../../assets/upload.svg";

const StepOne = () => {
    return (
        <div>
            <div>
                <label htmlFor="">Название</label>
                <input type="text"/>
            </div>
            <div className="form-group">
                 <label className="form-group_label">Описание</label>
                 <textarea className="form_element" name="description" cols="10" rows="5" placeholder="Описание"></textarea>
            </div>
                         <div className="form-group">
                             <label className="form-group_label">Баннер</label>
                             <div className="input__fileBox">
                                 <input name="file" type="file" id="input__file" className="form_element" name="file"
                                       className="input input__file"/>
                                <label htmlFor="input__file" className="input__file-button">
                                        <span className="input__file-icon-wrapper"><img className="input__file-icon"
                                                                                        src={Upload}
                                                                                        alt="Загрузить картинку"
                                                                                        width="25" /></span>
                                    <span className="input__file-button-text">Превью</span>
                                </label>
                            </div>
                        </div>
        </div>
    );
};
export default StepOne;