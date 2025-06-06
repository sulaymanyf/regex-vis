import { useAtomValue } from 'jotai'
import { NameAndQuantifier } from './name-quantifier'
import Nodes from './nodes'
import MidConnect from './mid-connect'
import Content from './content'
import { useSize } from './utils'
import { sizeMapAtom } from '@/atom'
import {
  GRAPH_GROUP_NODE_PADDING_VERTICAL,
  GRAPH_NODE_BORDER_RADIUS,
  GRAPH_NODE_MARGIN_HORIZONTAL,
} from '@/constants'
import type { AST } from '@/parser'

type Props = {
  x: number
  y: number
  node: AST.Node
  selected: boolean
}

function GroupLikeNode({ x, y, node, selected }: Props) {
  const sizeMap = useAtomValue(sizeMapAtom)
  const size = useSize(node, sizeMap)
  const { box: boxSize, content: contentSize } = size

  if (node.type !== 'group' && node.type !== 'lookAroundAssertion') {
    return null
  }

  const { id, children: nodeChildren } = node
  const centerY = y + boxSize[1] / 2
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
        className={`stroke-[1.5] fill-transparent ${('negate' in node && node.negate ? 'stroke-red-500 [stroke-dasharray:4_2]' : 'stroke-graph-group')}`}
      >
        {nodeChildren.length > 0 && (
          <>
            <MidConnect
              start={[contentX, centerY]}
              end={[contentX + GRAPH_NODE_MARGIN_HORIZONTAL, centerY]}
            />
            <MidConnect
              start={[
                contentX + contentSize[0] - GRAPH_NODE_MARGIN_HORIZONTAL,
                centerY,
              ]}
              end={[contentX + contentSize[0], centerY]}
            />
          </>
        )}
        <Nodes
          id={id}
          index={0}
          x={contentX + GRAPH_NODE_MARGIN_HORIZONTAL}
          y={contentY + GRAPH_GROUP_NODE_PADDING_VERTICAL}
          nodes={nodeChildren}
        />
      </Content>
    </>
  )
}
GroupLikeNode.displayName = 'GroupLikeGroup'
export default GroupLikeNode
