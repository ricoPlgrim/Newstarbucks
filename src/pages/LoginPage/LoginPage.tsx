import { useState, ChangeEvent, FormEvent } from "react";
import Input from "../../components/Input/Input";
import Checkbox from "../../components/Checkbox/Checkbox";
import Button from "../../components/Button/Button";
import Image from "../../components/Image/Image";
import loginLogo from "../../assets/images/login_logo.png";
import "./LoginPage.scss";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    id: "",
    password: "",
    autoLogin: false,
  });

  const handleInputChange = (_e: ChangeEvent<HTMLInputElement>, value: string, field: "id" | "password") => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      autoLogin: e.target.checked,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("로그인 시도:", formData);
    // 실제 로그인 로직은 여기에 구현
  };

  return (
    <div className="login-page">
      <div className="login-page__container">
        <div className="login-page__header">
          <Image
            src={loginLogo}
            alt="Starbucks SIREN 119"
            className="login-page__logo"
          />
        </div>

        <form className="login-page__form" onSubmit={handleSubmit}>
          <div className="login-page__input-group">
            <Input
              type="text"
              placeholder="아이디를 입력해 주세요"
              value={formData.id}
              onChange={(e, value) => handleInputChange(e, value, "id")}
              size="large"
              className="login-page__input"
            />
          </div>

          <div className="login-page__input-group">
            <Input
              type="password"
              placeholder="비밀번호를 입력해 주세요"
              value={formData.password}
              onChange={(e, value) => handleInputChange(e, value, "password")}
              size="large"
              className="login-page__input"
            />
          </div>

          <div className="login-page__checkbox-group">
            <Checkbox
              label="자동로그인"
              checked={formData.autoLogin}
              onChange={handleCheckboxChange}
              className="login-page__checkbox"
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            size="large"
            className="login-page__submit-btn"
            disabled={!formData.id || !formData.password}
          >
            로그인
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;

