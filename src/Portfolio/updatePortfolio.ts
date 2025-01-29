import { Portfolio } from "./Portfolio";
import getMaxDepth from "./getMaxDepth";
import evaluateCalculatedFieldVals from "./evaluateCalculatedFieldVals";
import propogateFieldVals from "./propogateFieldVals";
import { eqDeepSimple } from "@/util/util";
import getActiveViewGrouping from "@/View/getActiveViewGrouping";
import getActiveViewUnitGuids from "@/View/getActiveViewUnitGuids";

export default function updatePortfolio(portfolio: Portfolio) {
  propogateFieldVals(portfolio)

  evaluateCalculatedFieldVals(portfolio)

  // Legacy (groupings displayed instead)
  const newGuids = getActiveViewUnitGuids(portfolio)
  if (!eqDeepSimple(portfolio.activeViewUnitGuids, newGuids)) {
    portfolio.activeViewUnitGuids = newGuids
  }

  const newGrouping = getActiveViewGrouping(portfolio)
  if (!eqDeepSimple(portfolio.activeViewGrouping, newGrouping)) {
    portfolio.activeViewGrouping = newGrouping
  }

  updateLevelNames(portfolio)
}

function updateLevelNames(portfolio: Portfolio) {
  const maxDepth = getMaxDepth(portfolio)

  while (portfolio.levelNames.length < maxDepth) {
    portfolio.levelNames.push("")
  }
}