import React from 'react'

export const Rating: React.FC<{ rating: number }> = ({rating}) => {
    return (
        <div>
            {rating < 1 && <span>&#9734;&#9734;&#9734;&#9734;&#9734;</span>}
            {rating < 2 && rating >= 1 && <span>&#9733;&#9734;&#9734;&#9734;&#9734;</span>}
            {rating < 3 && rating >= 2 && <span>&#9733;&#9733;&#9734;&#9734;&#9734;</span>}
            {rating < 4 && rating >= 3 && <span>&#9733;&#9733;&#9733;&#9734;&#9734;</span>}
            {rating < 5 && rating >= 4 && <span>&#9733;&#9733;&#9733;&#9733;&#9734;</span>}
            {rating <= 6 && rating >= 5 && <span>&#9733;&#9733;&#9733;&#9733;&#9733;</span>}
        </div>
    )
}