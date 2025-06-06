import { useAtomValue } from 'jotai'
import { NameAndQuantifier } from './name-quantifier'
import Content from './content'
import TextNode from './text'
import { useSize } from './utils'
import { sizeMapAtom } from '@/atom'
import {
  GRAPH_NODE_BORDER_RADIUS,
  GRAPH_NODE_PADDING_HORIZONTAL,
  GRAPH_NODE_PADDING_VERTICAL,
  GRAPH_TEXT_FONT_SIZE,
} from '@/constants'
import type { AST } from '@/parser'

type Props = {
  x: number
  y: number
  node:
    | AST.CharacterNode
    | AST.BackReferenceNode
    | AST.BeginningBoundaryAssertionNode
    | AST.EndBoundaryAssertionNode
    | AST.WordBoundaryAssertionNode
  selected: boolean
}

function SimpleNode({ x, y, node, selected }: Props) {
  const sizeMap = useAtomValue(sizeMapAtom)
  const size = useSize(node, sizeMap)
  const { box: boxSize, content: contentSize } = size
  const contentX = x + (boxSize[0] - contentSize[0]) / 2
  const contentY = y + (boxSize[1] - contentSize[1]) / 2
  return (
    <>
      <NameAndQuantifier x={x} y={y} node={node} size={size} />
      <Content
        id={node.id}
        selected={selected}
        x={contentX}
        y={contentY}
        width={contentSize[0]}
        height={contentSize[1]}
        rx={GRAPH_NODE_BORDER_RADIUS}
        ry={GRAPH_NODE_BORDER_RADIUS}
        fill="transparent"
        className={`stroke-[1.5] ${('negate' in node && node.negate ? 'stroke-red-500 [stroke-dasharray:4_2]' : 'stroke-graph')}`}
      >
        <foreignObject
          x={contentX + GRAPH_NODE_PADDING_HORIZONTAL}
          y={contentY + GRAPH_NODE_PADDING_VERTICAL}
          width={contentSize[0] - GRAPH_NODE_PADDING_HORIZONTAL * 2}
          height={contentSize[1] - GRAPH_NODE_PADDING_VERTICAL * 2}
          fontSize={GRAPH_TEXT_FONT_SIZE}
        >
          <TextNode node={node} />
        </foreignObject>
      </Content>
    </>
  )
}

SimpleNode.displayName = 'SimpleNode'
export default SimpleNode
