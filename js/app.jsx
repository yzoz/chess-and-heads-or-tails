var React = require('react')
var ReactDOM = require('react-dom')

var numHor = 4;
var numVert = 4;
var numMatch = 2

var numAll = numHor*numVert;

function shuffle(arr) {
  arr.sort(function(a, b){return 0.5 - Math.random()});
  return arr;
}

function randomColor() {
  return Math.floor(Math.random()*16777215).toString(16);
}

function genSquares() {
  for (var squares=[], ellColor = randomColor(), i=1, j=1; i<=numAll; i++) {
    squares.push({
      'id': 'square-' + i,
      'rel': 'square-' + j,
      'color': ellColor
    });

    if (i % numMatch == 0) {
      j++;
      ellColor = randomColor()
    }
  }
  squares = shuffle(squares);
  console.log(squares);
  return squares;
}

class Square extends React.Component {
  constructor(props) {
    super(props);
    this.state = {heads: false};
    this.flip = this.flip.bind(this);
  }
  flip() {
    this.setState({heads: true});
  }
  render() {
    let bgColor = this.state.heads ? '#' + this.props.color : '';
    let cursorStyle = this.state.heads ? 'default' : ''
    return (<li 
              rel={this.props.rel}
              className={this.props.class}
              style={{
                backgroundColor: bgColor,
                cursor: cursorStyle
              }}
              id={this.props.id}
              onClick={this.flip} />);
    }
}

function Board(props) {
  const data = props.data;
  const listItems = data.map(function(item, index) {
    ellClass = 'tails';
    if ((index + 1) % numHor == 0) {
      ellClass = ellClass + ' line-end';
    };
    return (
    <Square key={index}
            rel={item.rel}
            color={item.color}
            class={ellClass}
            id={item.id} />
    );
  });
  console.log(listItems);
  return (
    <ul className='board'>
      {listItems}
    </ul>
  );
}

ReactDOM.render(
  <Board data={genSquares()} />,
  document.getElementById('root')
);