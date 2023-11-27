// import { Colors } from './color';

const Button = ({ title, onPress, icon, size, type, iconPosition, iconName}) => {
    const BtnStyle = (type) => {
        switch (type) {
        case 'Primary':
            return {
            btnType: [ButtonStyle.Primary],
            btnTxt: [ButtonStyle.PrimaryTxt],
            btnIcon: Colors.Gray100,
            };
        case 'Primary_r':
            return {
            btnType: [ButtonStyle.Primary, ButtonStyle.roundBtn],
            btnTxt: [ButtonStyle.PrimaryTxt],
            btnIcon: Colors.Gray100,
            };
        case 'Secondary':
            return {
            btnType: [ButtonStyle.Secondary],
            btnTxt: [ButtonStyle.SecondaryTxt],
            btnIcon: Colors.Gray900,
            };
        case 'Secondary_r':
            return {
            btnType: [ButtonStyle.Secondary, ButtonStyle.roundBtn],
            btnTxt: [ButtonStyle.SecondaryTxt],
            btnIcon: Colors.Gray900,
            };
        case 'Glass':
            return {
            btnType: [ButtonStyle.Glass],
            btnTxt: [ButtonStyle.GlassTxt],
            btnIcon: Colors.Gray100,
            };
        case 'Glass_r':
            return {
            btnType: [ButtonStyle.Glass, ButtonStyle.roundBtn],
            btnTxt: [ButtonStyle.GlassTxt],
            btnIcon: Colors.Gray100,
            };
        default:
            return {
            btnType: [ButtonStyle.Primary],
            btnTxt: [ButtonStyle.PrimaryTxt],
            btnIcon: Colors.Gray100,
            };
        }
    };
    const { btnType, btnTxt, btnIcon } = BtnStyle(type);

    const BtnSize = () => {
        switch (size){
        case 'L':
            return ButtonStyle.L;
        case 'M':
            return ButtonStyle.M;
        case 'S':
            return ButtonStyle.S;
        default:
            return ButtonStyle.L;
        }
    };

    return (
        <TouchableOpacity style={[ButtonStyle.btnCommon, BtnSize(), ...btnType]} onPress={onPress}>
        {iconPosition === 'left' && icon && (
            <Icon name={iconName} size={16} color={btnIcon} />
        )}
        <Text style={[ButtonStyle.btnTxt, ...btnTxt, CommonStyle.commonText]}>{title}</Text>
        {iconPosition === 'right' && icon && (
            <Icon name={iconName} size={16} color={btnIcon} />
        )}
        </TouchableOpacity>
    );
}

export {
    Button,
    TextButton,
    IconButton,
};
  