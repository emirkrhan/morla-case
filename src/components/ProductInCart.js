import React from 'react'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Typography from '@mui/material/Typography';

function ProductInCart({
    index,
    prd,
    handleChange,
    handleDecrease,
    handleIncrease,
    handleRemove }) {
        
    return (
        <div key={index} style={{ display: "flex", width: '100%', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: "50%" }}>
                <Typography sx={{ fontSize: "14px", fontWeight: 'bold' }} noWrap>{prd.brand + ' ' + prd.model}</Typography>
                <Typography color='primary' sx={{ fontSize: "12px" }}>{prd.price}</Typography>
            </div>
            <div style={{ width: "35%", display: "flex", fontSize: "13px", alignItems: "center", justifyContent: "center" }}>
                <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
                    <button onClick={() => handleDecrease(prd, index)} style={{
                        width: '1.5rem', height: '1.5rem', backgroundColor: '#ececec', outline: 'none',
                        border: 'none', cursor: 'pointer', borderTopLeftRadius: '5px', borderBottomLeftRadius: '5px'
                    }}>
                        <RemoveIcon fontSize='9px' />
                    </button>

                    <input
                        type="number"
                        min='1'
                        value={prd.quantity}
                        onChange={(e) => handleChange(e, index)}
                        style={{
                            width: '2rem', height: '1.5rem', backgroundColor: '#2a59fe',
                            outline: 'none', border: 'none', textAlign: 'center', color: 'white'
                        }} />
                    <button onClick={() => handleIncrease(index)} style={{
                        width: '1.5rem', height: '1.5rem', backgroundColor: '#ececec', outline: 'none',
                        border: 'none', cursor: 'pointer', borderTopRightRadius: '5px', borderBottomRightRadius: '5px'
                    }}>
                        <AddIcon fontSize='9px' />
                    </button>
                </div>
            </div>
            <div onClick={() => handleRemove(prd.id)} style={{ width: "15%", display: "flex", alignItems: "center", justifyContent: "center", cursor: 'pointer' }}>
                <DeleteRoundedIcon color='error' />
            </div>
        </div>
    )
}

export default ProductInCart