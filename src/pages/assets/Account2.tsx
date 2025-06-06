import { Button } from "@/components";
import * as S from "./Account2.styles";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ReactComponent as EyeOffIcon } from "@/assets/icons/eye-off.svg";
import { ReactComponent as EyeOpenIcon } from "@/assets/icons/eye-open.svg";
import { useLocation } from "react-router-dom";
import axiosInstance from "@/lib/axionsInstance";

export default function Account2() {
  const navigate = useNavigate();
  const location = useLocation();
  const { bank, accountNumber } = location.state || {};
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);

  async function handleAccount() {
    try {
      await axiosInstance.post(
        "/bank/account",
        {
          bank: bank,
          accountNumber: accountNumber,
          password: Number(password),
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      navigate("/asset/AccountSuccess");
    } catch (error) {
      console.error("Error occurred while setting the account:", error);
      navigate("/asset/AccountFail");
      return;
    }
  }
  return (
    <S.Account2Container>
      <S.Title>
        본인인증을 위해
        <br />
        비밀번호를 입력해주세요
      </S.Title>
      <S.InputWrap>
        <S.InputBox>
          <S.InputLabel
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ opacity: visible ? 0 : 1 }}
          />
          <S.InputLabel
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              position: "absolute",
              top: 10,
              left: 0,
              opacity: visible ? 1 : 0,
            }}
          />
        </S.InputBox>
        {visible ? (
          <EyeOpenIcon
            width={16}
            height={16}
            onClick={() => setVisible(!visible)}
            style={{ cursor: "pointer" }}
          />
        ) : (
          <EyeOffIcon
            width={16}
            height={16}
            onClick={() => setVisible(!visible)}
            style={{ cursor: "pointer" }}
          />
        )}
      </S.InputWrap>
      <Button
        label="확인"
        onClick={() => handleAccount()}
        disabled={password === ""}
      />
    </S.Account2Container>
  );
}
