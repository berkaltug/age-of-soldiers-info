import React, { useEffect } from "react";
import "./style.scss";
import {
  Checkbox,
  Col,
  Radio,
  RadioChangeEvent,
  Row,
  Slider,
  Spin,
} from "antd";
import { Cost } from "../../constants/Costs";
import {
  getUnits,
  setAgeFilter,
  setFoodFilter,
  setGoldFilter,
  setWoodFilter,
} from "../../redux/slices/unitSlice";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import UnitList from "../../components/UnitList";

const UnitsPage = () => {
  const dispatch = useAppDispatch();
  const woodFilter = useAppSelector((state) => state.unit.woodFilter);
  const foodFilter = useAppSelector((state) => state.unit.foodFilter);
  const goldFilter = useAppSelector((state) => state.unit.goldFilter);
  const ageFilter = useAppSelector((state) => state.unit.ageFilter);
  const units = useAppSelector((state) => state.unit.units);
  const unitsLoading = useAppSelector((state) => state.unit.unitsLoading);

  useEffect(() => {
    const costs = {
      [Cost.FOOD]: foodFilter,
      [Cost.WOOD]: woodFilter,
      [Cost.GOLD]: goldFilter,
    };
    dispatch(getUnits({ costFilter: costs, age: ageFilter }));
  }, [woodFilter, foodFilter, goldFilter, ageFilter]);

  const onCostCheck = (type: Cost) => (e: CheckboxChangeEvent) => {
    if (type === Cost.FOOD) {
      const filter = { ...foodFilter };
      filter.active = e.target.checked;
      dispatch(setFoodFilter(filter));
    }
    if (type === Cost.WOOD) {
      const filter = { ...woodFilter };
      filter.active = e.target.checked;
      dispatch(setWoodFilter(filter));
    }
    if (type === Cost.GOLD) {
      const filter = { ...goldFilter };
      filter.active = e.target.checked;
      dispatch(setGoldFilter(filter));
    }
  };

  const onSlideEnd = (type: Cost) => (value: number[]) => {
    type === Cost.WOOD &&
      dispatch(setWoodFilter({ min: value[0], max: value[1], active: true }));
    type === Cost.FOOD &&
      dispatch(setFoodFilter({ min: value[0], max: value[1], active: true }));
    type === Cost.GOLD &&
      dispatch(setGoldFilter({ min: value[0], max: value[1], active: true }));
  };

  const onAgeSelect = (e: RadioChangeEvent) => {
    dispatch(setAgeFilter(e.target.value));
  };

  return (
    <div className="list-container">
      <h1>Units Page</h1>
      <Row className="row-center">
        <Col md={3} className="age-title">
          <div>Age</div>
        </Col>
        <Col md={6} className="col-center">
          <Radio.Group
            defaultValue="a"
            buttonStyle="solid"
            onChange={onAgeSelect}
          >
            <Radio.Button value="All">All</Radio.Button>
            <Radio.Button value="Dark">Dark</Radio.Button>
            <Radio.Button value="Feudal">Feudal</Radio.Button>
            <Radio.Button value="Castle">Castle</Radio.Button>
            <Radio.Button value="Imperial">Imperial</Radio.Button>
          </Radio.Group>
        </Col>
      </Row>
      <Row className="row-center">
        <Col md={9} className="costs-title">
          <div>Costs</div>
        </Col>
      </Row>
      <Row className="row-center">
        <Col md={3}>
          <Checkbox onChange={onCostCheck(Cost.WOOD)}>Wood</Checkbox>
        </Col>
        <Col md={6}>
          <Slider
            range
            min={0}
            max={200}
            disabled={!woodFilter.active}
            onChangeComplete={onSlideEnd(Cost.WOOD)}
          />
        </Col>
      </Row>
      <Row className="row-center">
        <Col md={3}>
          <Checkbox onChange={onCostCheck(Cost.FOOD)}>Food</Checkbox>
        </Col>
        <Col md={6}>
          <Slider
            range
            min={0}
            max={200}
            disabled={!foodFilter.active}
            onChangeComplete={onSlideEnd(Cost.FOOD)}
          />
        </Col>
      </Row>
      <Row className="row-center">
        <Col md={3}>
          <Checkbox onChange={onCostCheck(Cost.GOLD)}>Gold</Checkbox>
        </Col>
        <Col md={6}>
          <Slider
            range
            min={0}
            max={200}
            disabled={!goldFilter.active}
            onChangeComplete={onSlideEnd(Cost.GOLD)}
          />
        </Col>
      </Row>
      <Row className="row-center">
        <Col md={12} >
          <Spin spinning={unitsLoading}>
            <UnitList list={units} />
          </Spin>
        </Col>
      </Row>
    </div>
  );
};

export default UnitsPage;
