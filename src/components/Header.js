import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { SvgIcon } from "@material-ui/core";
import Avatar from '@material-ui/core/Avatar';
import {Link} from 'react-router-dom';
import Kai from '../assets/kai_profile.jpeg'



const Header = ({title}) => {
    return (
        <header className="z-50 bg-gradient-to-r from-indigo-600 to-indigo-500 py-2 fixed min-w-full rounded-b-md">
            <SvgIcon viewBox="0 0 15 10" className="text-white float-left text-xs cursor-pointer mt-2 ml-5">
                <ArrowBackIosIcon/>
            </SvgIcon>
            {/* <SvgIcon viewBox="0 0 15 11" className="text-white float-right text-xs cursor-pointer mt-0.5 mr-3"> */}
                <Link to="/profil">
                    <Avatar className="float-right" alt="Kai Schäfer" src={Kai} style={{margin: '0.1em 1em 0.1em 0.1em', boxShadow: '0 10px 10px -5px'}}/>
                </Link>
            {/* </SvgIcon> */}
            
            <h1 className="text-center text-lg text-white pt-2">{title}</h1>
        </header>
    )
}


export default Header 
