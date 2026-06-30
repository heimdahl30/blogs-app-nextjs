'use client';

import { useState } from "react";
import { createToken } from "@/app/actions/users";

interface TokenGeneratorProps {
  initialToken: string | null;
}

const TokenGenerator = ({ initialToken }: TokenGeneratorProps) => {
  const [token, setToken] = useState<string | null>(initialToken);

  const handleGenerateToken = async () => {

    try {
      const newToken = await createToken();
      if (newToken) {
        setToken(newToken);
      }
    } catch (error) {
      console.error("Failed to generate token:", error);
    }
  };

  return (
    <div className="w-full">
      {token ? (
        <div data-testid="token-display" className="w-full bg-gray-100 p-4 rounded-md border border-gray-200 my-3">
          <p className="text-gray-600 font-mono break-all">Current Token</p>
                <div className="bg-gray-200 p-4 rounded-md my-3">
                    <p data-testid="api-token" className="text-gray-600 font-mono break-all">{token}</p>
          </div>
        </div>
      ) : (
        <p data-testid="no-token-message" className="text-red-500 font-medium my-3">No API token found. Please generate one.</p>
      )}

       <button data-testid="generate-token-button" onClick={handleGenerateToken} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 cursor-pointer">Generate New Token</button>
    </div>
  );
}

export default TokenGenerator;
