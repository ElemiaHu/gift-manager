import { fetchAddGift, fetchDeleteGift, fetchUpdateBirthday, fetchUpdateGift, fetchUserData } from "./services";
import { ACTIONS, ERROR } from "./constants";
import Loading from "./Loading";
import UpdateBirthday from "./UpdateBirthday";
import BirthdayInfo from "./BirthdayInfo";
import { useReducer, useEffect, useState } from "react";
import reducer, { initialState } from "./personalReducer";
import GiftItem from "./GiftItem";
import empty from "./media/empty.svg";
import ballons from "./media/balloons.svg";

function Personal({ onLogout }) {
    const [ state, dispatch ] = useReducer( reducer, initialState);
    const [ updateBirthday, setUpdateBirthday ] = useState(false);
    const [ newGift, setNewGift ] = useState(false);

    function onUpdateBirthday(newBirthday) {
        fetchUpdateBirthday(newBirthday)
        .then( response => {
            dispatch({ type: ACTIONS.UPDATE_BIRTHDAY, birthday: response.birthday});
            setUpdateBirthday(false);
        })
        .catch( error => {
            if(error.error === ERROR.AUTH_MISSING) onLogout();
            else dispatch({ type: ACTIONS.REPORT_ERROR, error: error.error });
        })
    }

    function onAddGift(gift) {
        fetchAddGift(gift)
        .then( response => {
            dispatch({ type: ACTIONS.ADD_GIFT, gift: response});
        })
        .catch( error => {
            if(error.error === ERROR.AUTH_MISSING) onLogout();
            else dispatch({ type: ACTIONS.REPORT_ERROR, error: error.error });
        })
    }

    function onUpdateGift(id, newGift) {
        fetchUpdateGift(id, newGift)
        .then( response => {
            dispatch({ type: ACTIONS.CHANGE_GIFT, gift: response });
        })
        .catch( error => {
            if(error.error === ERROR.AUTH_MISSING) onLogout();
            else dispatch({ type: ACTIONS.REPORT_ERROR, error: error.error });
        })
    }

    function onDeleteGift(id) {
        fetchDeleteGift(id)
        .then( () => {
            dispatch({ type: ACTIONS.DELETE_GIFT, id });
        })
        .catch( error => {
            if(error.error === ERROR.AUTH_MISSING) onLogout();
            else dispatch({ type: ACTIONS.REPORT_ERROR, error: error.error });
        })
    }

    function onFetchData() {
        fetchUserData()
        .then( response => {
            dispatch({ type: ACTIONS.GET_DATA, birthday: response.birthday, gifts: response.giftList });
        })
        .catch( error => {
            if(error.error === ERROR.AUTH_MISSING) onLogout();
            else dispatch({ type: ACTIONS.REPORT_ERROR, error: error.error });
        })
    }

    useEffect( () => {
        onFetchData();
    }, []);

    return (
        <div className="personal-container">
            <div className="error">{state.error}</div>
            { state.loadingData && <Loading />}
            { !state.loadingData && 
            <div className="personal-info">
                <div className="birthday-container">
                    <div className="birthday-title">
                        <span>Birthday Info</span>
                        <button onClick={() => {
                            setUpdateBirthday(!updateBirthday);
                            dispatch({ type: ACTIONS.CLEAR_ERROR });
                            }
                            }>{ updateBirthday ? 'Cancel' : 'Edit'}</button>
                    </div>

                    <div className="birthday-info">
                        { !updateBirthday && !state.birthday && <div className="no-birthday-info">No Birthday Information</div> }
                        { !updateBirthday && state.birthday 
                        && <BirthdayInfo birthday={new Date(state.birthday)} person={'your'}/>}
                        { updateBirthday && <UpdateBirthday onUpdateBirthday={onUpdateBirthday}/>}
                    </div>
                    <img src={ballons} alt="illustration of a woman holding a ballon"/>
                </div>

                <div className="gift-list-container">
                    <div className="title">Gift List</div>
                    <div className="add-gift-container">
                        <input type="text" value={newGift || ''} className="add-gift-input"
                            onInput={(e) => setNewGift(e.target.value)}/>
                        <button className="add-gift-button" onClick={() => {
                            onAddGift(newGift);
                            setNewGift('');
                            }}><i className="gg-add"></i><span>Add Gift</span></button>
                    </div>
                    
                    <div className="gifts">
                        { Object.keys(state.gifts).length === 0 && <div className="empty"><img src={empty} alt="illustration of an empty box"/><div>Empty Gift List</div></div>}
                        {Object.values(state.gifts).map(gift => (
                            <GiftItem gift={gift} onDeleteGift={onDeleteGift} onUpdateGift={onUpdateGift} key={gift.id}/>
                        ))}
                    </div>
                </div>
            </div>}
        </div>
    )
}

export default Personal;