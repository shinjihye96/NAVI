import './text_feild.scss';
import { IconButton } from 'styles/components/button'

export default function LabelInput(label, subTxt) {
    <>
        <div className="input_wrap">
            <p className='label'>{label}</p>
            <div className="input_box">
                <input type="text" className={`input_common label`}/>
                <div className="btn_box">
                    <IconButton iconName='EyeOpen' type='quaternary' size='S' />
                    <IconButton iconName='CloseCircle' type='quaternary' size='S' />
                </div>
            </div>
            <p className='sub_txt'>{subTxt}</p>
        </div>
    </>
}

export default function Input(clasName) {
    <>
        <div className="input_box">
            <input type="text" className={`input_common`}/>
        </div>
    </>
}