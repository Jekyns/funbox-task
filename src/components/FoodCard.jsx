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
    e.preventDefault();
    disableBlockHover();
    props.toogleSelectCard(props.cardIndex);
  }

  const enableBlockHover = () => {
    setBlockHover(false);
  }

  const disableBlockHover = () => {
    setBlockHover(true);
  }

  return (
    <div className="card-wrapper">
      <Card className="card" blockHover={blockHover} onMouseOut={enableBlockHover} onClick={toogleSelectCard} selected={props.selected} disabled={props.disabled} image={props.image} >
        {props.disabled ? <div className="card__disabled"></div> : null}
        <div className="card__general">
          <div className="card__description">
            <span className="card__description-span">{props.description}</span>
          </div>
          <div className="card__title">
            <h2 className="card__title-h2">{props.title}</h2>
          </div>
          <div className="card__taste">
            <h3 className="card__taste-h3">{props.taste}</h3>
          </div>
          <div className="card__extras">
            {showExtras()}
          </div>
        </div>

        <CardWeight selected={props.selected} disabled={props.disabled} className="card__weight">
          <div className="weight__amount">
            <span className="weight__amount-span">{props.weight}</span>
          </div>
          <div className="weight__unit">
            <span className="weight__unit-span">кг</span>
          </div>
        </CardWeight>
      </Card>
      <div className="card__relevance">
        <p className={`card__relevance-p ${props.disabled ? 'card__relevance-disabled' : ''} ${props.selected ? 'card__relevance-enabled' : ''}`}>
          {props.disabled ?
            (<>
              {props.disabledText || `Печалька, ${props.taste} закончился.`}
            </>) :
            props.selected ? props.selectedText :
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