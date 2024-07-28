import React, { useEffect } from "react";
import { Unit } from "../../service/unitService";
import "./style.scss";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getUnitDetail } from "../../redux/slices/unitSlice";
import { Card, Col, Row, Spin } from "antd";

const UnitDetailPage = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const detail=useAppSelector(state=>state.unit.unitDetail)
  const detailLoading=useAppSelector(state=>state.unit.unitDetailLoading)
  useEffect(() => {
    dispatch(getUnitDetail(id));
  }, []);

  return <div className="detail-container">
    <Spin spinning={detailLoading}>
      <Card>
    <Row><Col md={3}><p className="infoTitle">ID:</p></Col><Col><p className="infoText">{detail?.id|| '-'}</p></Col></Row>
    <Row><Col md={3}><p className="infoTitle">Name:</p></Col><Col><p className="infoText">{detail?.name|| '-'}</p></Col></Row>
    <Row><Col md={3}><p className="infoTitle">Description:</p></Col><Col><p className="infoText">{detail?.description|| '-'}</p></Col></Row>
    <Row><Col md={3}><p className="infoTitle">Min. Required Age:</p></Col><Col><p className="infoText">{detail?.age|| '-'}</p></Col></Row>
    <Row><Col md={3}><p className="infoTitle">Wood Cost:</p></Col><Col><p className="infoText">{detail?.cost?.Wood|| '-'}</p></Col></Row>
    <Row><Col md={3}><p className="infoTitle">Food Cost:</p></Col><Col><p className="infoText">{detail?.cost?.Food|| '-'}</p></Col></Row>
    <Row><Col md={3}><p className="infoTitle">Gold Cost:</p></Col><Col><p className="infoText">{detail?.cost?.Gold|| '-'}</p></Col></Row>
    <Row><Col md={3}><p className="infoTitle">Build Time:</p></Col><Col><p className="infoText">{detail?.build_time|| '-'}</p></Col></Row>
    <Row><Col md={3}><p className="infoTitle">Reload Time:</p></Col><Col><p className="infoText">{detail?.reload_time|| '-'}</p></Col></Row>
    <Row><Col md={3}><p className="infoTitle">Hit Points:</p></Col><Col><p className="infoText">{detail?.hit_points|| '-'}</p></Col></Row>
    <Row><Col md={3}><p className="infoTitle">Attack:</p></Col><Col><p className="infoText">{detail?.attack|| '-'}</p></Col></Row>
    <Row><Col md={3}><p className="infoTitle">Accuracy:</p></Col><Col><p className="infoText">{detail?.accuracy || '-'}</p></Col></Row>
    </Card>
    </Spin>
    
  </div>;
};

export default UnitDetailPage;
