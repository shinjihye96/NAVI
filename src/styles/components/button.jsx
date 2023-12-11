import './color.scss';
import './button.scss';
import Icon from 'styles/components/icon';

// prim button
const PrimButton = ({ title, type, onClick, icon, iconPosition, size, href, ...props}) => {
  // button의 link 유무
  const isLink = href && href.length > 0;

  // button size
  const BtnSize = (size) => {
    switch (size){
      case 'L':
        return 'L';
      case 'M':
        return 'M';
      case 'S':
        return 'S';
      default:
        return 'L';
    }
  };

  const btnSizeClass = BtnSize(size);

  const btntype = (type) => {
      switch (type){
        case 'primary':
          return 'primary';
        case 'secondary':
          return 'secondary';
        case 'glass':
          return 'glass';
        default:
          return 'primary';
      }
  };
  const btnTypeClass = btntype(type);

  if(isLink) {
    return (
        <>
          <a href={href} className={`btn_common prim_btn ${btnSizeClass} ${btnTypeClass}`} onClick={onClick} {...props}>
              {iconPosition === 'left' && icon && (
                  <Icon name={icon} size={16} className={`btn_icon`} />
              )}
              <p className='btn_tit'>{title}</p>
              {iconPosition === 'right' && icon && (
                  <Icon name={icon} size={16} className={`btn_icon`} />
              )}
          </a>
        </>
    );
  }

  return (
      <>
        <button className={`btn_common prim_btn ${btnSizeClass} ${btnTypeClass}`} onClick={onClick} {...props}>
            {iconPosition === 'left' && icon && (
                <Icon name={icon} size={16} className={`btn_icon`} />
            )}
            <p className='btn_tit'>{title}</p>
            {iconPosition === 'right' && icon && (
                <Icon name={icon} size={16} className={`btn_icon`} />
            )}
        </button>
      </>
  );
}

// text button
const TextButton = ({ title, type, onClick, icon, iconPosition, size, href, ...props}) => {
  // button의 link 유무
  const isLink = href && href.length > 0;

  // button size
  const BtnSize = (size) => {
    switch (size){
      case 'L':
        return 'L';
      case 'M':
        return 'M';
      case 'S':
        return 'S';
      case 'XS':
        return 'XS';
      default:
        return 'L';
    }
  };

  const btnSizeClass = BtnSize(size);

  const btntype = (type) => {
      switch (type){
        case 'primary':
          return 'primary';
        case 'secondary':
          return 'secondary';
        case 'glass':
          return 'glass';
        default:
          return 'primary';
      }
  };
  const btnTypeClass = btntype(type);

  if(isLink) {
    return (
      <>
        <a href={href} className={`btn_common txt_btn ${btnSizeClass} ${btnTypeClass}`} onClick={onClick} {...props}>
            {iconPosition === 'left' && icon && (
                <Icon name={icon} size={16} className={`btn_icon`} />
            )}
            <p className='btn_tit'>{title}</p>
            {iconPosition === 'right' && icon && (
                <Icon name={icon} size={16} className={`btn_icon`} />
            )}
        </a>
      </>
    );
  }

  return (
    <>
        <button className={`btn_common txt_btn ${btnSizeClass} ${btnTypeClass}`} onClick={onClick} {...props}>
            {iconPosition === 'left' && icon && (
                <Icon name={icon} size={16} className={`btn_icon`} />
            )}
            <p className='btn_tit'>{title}</p>
            {iconPosition === 'right' && icon && (
                <Icon name={icon} size={16} className={`btn_icon`} />
            )}
        </button>
    </>
  );
}

// icon button
const IconButton = ({type, onClick, iconName, size, href, ...props}) => {
  // button의 link 유무
  const isLink = href && href.length > 0;

  // button size
  const BtnSize = (size) => {
    switch (size){
      case 'L':
        return 'L';
      case 'M':
        return 'M';
      case 'S':
        return 'S';
      case 'XS':
        return 'XS';
      default:
        return 'L';
    }
  };

  const btnSizeClass = BtnSize(size);

  const btntype = (type) => {
      switch (type){
        case 'primary':
          return 'primary';
        case 'secondary':
          return 'secondary';
        case 'glass':
          return 'glass';
        default:
          return 'primary';
      }
  };
  const btnTypeClass = btntype(type);

  if(isLink) {
    return (
      <>
        <a href={href} className={`btn_common icon_btn ${btnSizeClass} ${btnTypeClass}`} onClick={onClick} {...props}>
            <Icon name={iconName} size={16} className={`btn_icon`} />
        </a>
      </>
    );
  }

  return (
    <>
        <button className={`btn_common icon_btn ${btnSizeClass} ${btnTypeClass}`} onClick={onClick} {...props}>
          <Icon name={iconName} size={16} className={`btn_icon`} />
        </button>
    </>
  );
}

export {
    PrimButton,
    TextButton,
    IconButton,
};

// example
// <PrimButton title='test' iconPosition='left' icon='Plus' type='primary'/>
// <PrimButton href='/' title='test' iconPosition='left' icon='Plus' type='primary'/>
// <IConButton href='/' title='test' iconName='Plus' type='primary'/>
