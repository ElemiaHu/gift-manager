import { useState } from "react";

function GiftItem({ gift, onDeleteGift, onUpdateGift }) {
    const [ edit, setEdit ] = useState(false);
    const [ newGift, setNewGift ] = useState(gift.gift);

    return (
        <div key={gift.id} className="gift-item">
            <i className="gg-gift"></i>
            { gift.claimedBy !== 'dog' && <span className="claimed-gift-content">{ gift.gift } claimed by {gift.claimedBy}</span>}
            { gift.claimedBy === 'dog' && <span className="edit">
                { edit && 
                <form onSubmit={(e) => {
                    e.preventDefault();
                    onUpdateGift(gift.id, newGift);
                    setEdit(!edit);}}>
                    <input type="text" value={newGift} className="edit-gift-input"
                        onInput={(e) => setNewGift(e.target.value)}/>
                </form>
                }
                { !edit && <span className="gift-content">{gift.gift}</span> }
                <button className="edit-button" onClick={() => setEdit(!edit)}>{ edit ? 'Cancel' : 'Edit'}</button>
                <button className="delete-button" onClick={() => {onDeleteGift(gift.id)}}>Delete</button>
            </span>}
            
        </div>
    )
}

export default GiftItem;