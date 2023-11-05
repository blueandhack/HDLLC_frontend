import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreement, setAgreement] = useState(false);

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const [
    firstTimeChangePasswordInputValue,
    setFirstTimeChangePasswordInputValue,
  ] = useState(false);

  const [showPasswordError, setShowPasswordError] = useState(false);
  const [showConfirmPasswordError, setShowConfirmPasswordError] =
    useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(firstName);
    console.log(lastName);
    console.log(emailAddress);

    // api request

    try {
      const response = await fetch("http://localhost:3001/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          email: emailAddress,
          password: password,
        }),
      });
      console.log(response);
      if (response.status !== 200) {
        setShowAlert(true);
        setAlertMessage("Something went wrong, please try again later.");
      }
      if (response.status === 200) {
        // go to login page
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
      setShowAlert(true);
      setAlertMessage("Something went wrong, please try again later.");
    }
  };

  useEffect(() => {
    // check password length, if less than 8, show error
    if (password.length < 8) {
      setShowPasswordError(true);
    } else {
      setShowPasswordError(false);
    }
  }, [password]);

  useEffect(() => {
    // check password and confirmPassword are the same
    if (password !== confirmPassword) {
      setShowConfirmPasswordError(true);
    } else {
      setShowConfirmPasswordError(false);
    }
  }, [password, confirmPassword]);

  return (
    <div className="App">
      {/* create a alert window */}
      {showAlert && (
        <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          <span class="block sm:inline">{alertMessage}</span>
          <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
            <svg
              class="fill-current h-6 w-6 text-red-500"
              role="button"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              onClick={() => {
                setShowAlert(false);
              }}
            >
              <title>Close</title>
              <path
                fill-rule="evenodd"
                d="M14.348 5.652a1 1 0 010 1.414L9.414 10l4.934 4.934a1 1 0 11-1.414 1.414L8 11.414l-4.934 4.934a1 1 0 11-1.414-1.414L6.586 10 .652 5.934a1 1 0 111.414-1.414L8 8.586l4.934-4.934a1 1 0 011.414 0z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </span>
        </div>
      )}

      <div class="text-5xl font-bold pt-10 pb-10">Get in touch</div>
      {/* center div block */}
      <div class="flex justify-center">
        {/* using tailwind to create a form include email and password inputs */}
        <form onSubmit={handleSubmit}>
          <div class="w-full max-w-xs">
            {/* add firstName and LastName inputs and they are same line */}
            <div class="mb-4 flex">
              <div class="mr-2">
                <label
                  class="block text-gray-700 text-sm font-bold mb-2 text-left"
                  for="firstName"
                >
                  First Name
                </label>
                <input
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
                  id="firstName"
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                  required
                />
              </div>
              <div>
                <label
                  class="block text-gray-700 text-sm font-bold mb-2 text-left"
                  for="lastName"
                >
                  Last Name
                </label>
                <input
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
                  id="lastName"
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                  required
                />
              </div>
            </div>
            <div class="mb-4">
              <label
                class="block text-gray-700 text-sm font-bold mb-2 text-left"
                for="email"
              >
                Email
              </label>
              <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Email"
                value={emailAddress}
                onChange={(e) => {
                  setEmailAddress(e.target.value);
                }}
              />
            </div>
            <div class="mb-4">
              <label
                class="block text-gray-700 text-sm font-bold mb-2 text-left"
                for="password"
              >
                Password
              </label>
              <input
                class={
                  showPasswordError && firstTimeChangePasswordInputValue
                    ? "shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline border-red-500"
                    : "shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                }
                id="password"
                type="password"
                placeholder="******************"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setFirstTimeChangePasswordInputValue(true);
                }}
              />
              {showPasswordError && firstTimeChangePasswordInputValue && (
                <p class="text-red-500 text-xs italic">
                  Your password must be at least 8 characters long.
                </p>
              )}
            </div>
            {/* add confirm password input */}
            <div class="mb-4">
              <label
                class="block text-gray-700 text-sm font-bold mb-2 text-left"
                for="password"
              >
                Confirm Password
              </label>
              <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                // id="password"
                type="password"
                placeholder="******************"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
              />
              {showConfirmPasswordError && (
                <p class="text-red-500 text-xs italic">
                  Your confirm password must be the same as password.
                </p>
              )}
            </div>
            {/* add checkbox agreement */}
            <div class="mb-4">
              <label class="inline-flex items-center">
                <input
                  type="checkbox"
                  class="form-checkbox h-5 w-5 text-gray-600"
                  required
                  value={agreement}
                  onChange={(e) => {
                    setAgreement(e.target.value);
                  }}
                />
                <span class="ml-2 text-gray-700">
                  I agree to the{" "}
                  <Link href="#" class="text-blue-500">
                    terms and conditions
                  </Link>
                </span>
              </label>
            </div>
            <div class="flex items-center justify-between">
              <button
                class={
                  showPasswordError || showConfirmPasswordError
                    ? "bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                    : "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                }
                type="submit"
                disabled={showPasswordError || showConfirmPasswordError}
              >
                Continue
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
