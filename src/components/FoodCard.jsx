import React from 'react';
import ExtraInfo from './ExtraInfo';
import '../App.css';
import styled from 'styled-components';
import colors from '../utils/defaultColors';

function FoodCard(props) {
  const { extras } = props;
  const [blockHover, setBlockHover] = React.useState(false);
  const showExtras = () => {
    const extraHtml = [];
    extras.map((extra) => {
      extraHtml.push(<ExtraInfo {...extra} key={extra.amount} />)
    })
    return extraHtml;
  }

  const toogleSelectCard = (e) => {
    const { toogleSelectCard, cardIndex } = props;
    e.preventDefault();
    disableBlockHover();
    toogleSelectCard(cardIndex);
  }

  const enableBlockHover = () => {
    setBlockHover(false);
  }

  const disableBlockHover = () => {
    setBlockHover(true);
  }
  const { selected, disabled, description, title, taste, selectedText, image, weight, disabledText } = props;
  return (
    <div className="card-wrapper">
      <Card
        className="card"
        blockHover={blockHover}
        onMouseOut={enableBlockHover}
        onClick={toogleSelectCard}
        selected={selected}
        disabled={disabled}
        image={image}
      >
        {disabled ? <div className="card__disabled"></div> : null}
        <div className="card__general">
          <div className="card__description">
            <span className="card__description-span">{description}</span>
          </div>
          <div className="card__title">
            <h2 className="card__title-h2">{title}</h2>
          </div>
          <div className="card__taste">
            <h3 className="card__taste-h3">{taste}</h3>
          </div>
          <div className="card__extras">
            {showExtras()}
          </div>
        </div>

        <CardWeight selected={selected} disabled={disabled} className="card__weight">
          <div className="weight__amount">
            <span className="weight__amount-span">{weight}</span>
          </div>
          <div className="weight__unit">
            <span className="weight__unit-span">кг</span>
          </div>
        </CardWeight>
      </Card>
      <div className="card__relevance">
        <p className={`card__relevance-p ${disabled ? 'card__relevance-disabled' : ''} ${selected ? 'card__relevance-enabled' : ''}`}>
          {disabled ?
            (<>
              {disabledText || `Печалька, ${taste} закончился.`}
            </>) :
            selected ? selectedText :
              (<>
                Чего сидишь? Порадуй котэ,&nbsp;
                <PurchaseLink className="card__relevance-a" href="" onClick={toogleSelectCard}>купи</PurchaseLink>
              </>)
          }
        </p>
      </div>
    </div>
  )
}


const Card = styled.div({
  borderColor: props => props.disabled ?
    colors.disabledColor :
    props.selected ?
      colors.selectedColor :
      colors.defaultColor,
  backgroundImage: props => props.image ? `url(${props.image})` : 'none',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'left bottom',
  '&::after': {
    background: props => props.disabled ?
      colors.disabledColor :
      props.selected ?
        colors.selectedColor :
        colors.defaultColor
  },
  '&:hover': {
    borderColor: props => !props.blockHover ? !props.disabled ?
      props.selected ?
        colors.selectedHoverColor :
        colors.defaultHoverColor
      : '' : ''
  },
  '&:hover>.card__weight, &:hover::after': {
    background: props => !props.blockHover ? !props.disabled ?
      props.selected ?
        colors.selectedHoverColor :
        colors.defaultHoverColor
      : '' : ''
  }

});

const PurchaseLink = styled.a({
  textDecoration: 'none',
  borderBottom: `1px dashed ${colors.defaultColor}`,
  color: colors.defaultColor,
});

const CardWeight = styled.div`
  background: ${
  props => props.disabled ?
    colors.disabledColor :
    props.selected ?
      colors.selectedColor :
      colors.defaultColor
  }
`;

export default FoodCard;