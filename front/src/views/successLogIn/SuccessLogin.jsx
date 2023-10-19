import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const SuccessLogIn = () => {
	const { token } = useParams();
	useEffect(() => {});
	return <div>SuccessLogin</div>;
};

export default SuccessLogIn;
