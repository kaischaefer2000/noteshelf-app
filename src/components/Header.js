import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { SvgIcon } from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';



const Header = () => {
    const Path = window.location.pathname;     
    return (
        <header className="bg-gradient-to-r from-indigo-600 to-indigo-500 py-2 fixed min-w-full rounded-b-md">
            <SvgIcon viewBox="0 0 15 10" className="text-white float-left text-xs cursor-pointer mt-0.5 ml-3">
                <ArrowBackIosIcon/>
            </SvgIcon>
            <SvgIcon viewBox="0 0 15 11" className="text-white float-right text-xs cursor-pointer mt-0.5 mr-3">
                <SearchIcon/>
            </SvgIcon>
            
            <h1 className="text-center text-sm text-white pt-1">
                {(() => {
                        
                   switch (Path) {
                      case '/artikel':
                          return (
                            <div>Meine Artikel</div>
                          )
                      case '/favoriten':
                          return (
                            <div>Meine Favoriten</div>
                          )
                      case '/profil':
                          return (
                            <div>Mein Profil</div>
                          )
                      default:
                          return (
                            <div>Mein Bücher</div>
                          )
                   }
               
                })()}
            </h1>
        </header>
    )
}


export default Header 
